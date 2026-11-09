import React, { useCallback, useEffect, useRef, useState } from "react";
import "./style.scss";

type Point = { x: number; y: number };
type Status = "idle" | "running" | "paused" | "over" | "won";

interface Game {
  snake: Point[];
  direction: Point;
  /** Turns pressed between ticks; applied one per tick so quick combos are not lost. */
  queue: Point[];
  food: Point;
  eaten: number;
  status: Status;
  startedAt: number;
  pausedAt: number;
  endedAt: number;
  elapsed: number;
}

const COLS = 20;
const ROWS = 30;
const START_LENGTH = 5;
const FOOD_TO_WIN = 8;
const TICK_MS = 90;
const MAX_QUEUED_TURNS = 3;
// Keys pressed in the last moment of a game should not instantly start a new one.
const RESTART_COOLDOWN_MS = 350;
const BEST_TIME_KEY = "snake-best-time-ms";

const UP: Point = { x: 0, y: -1 };
const DOWN: Point = { x: 0, y: 1 };
const LEFT: Point = { x: -1, y: 0 };
const RIGHT: Point = { x: 1, y: 0 };

const DIRECTION_BY_KEY: Record<string, Point> = {
  ArrowUp: UP,
  ArrowDown: DOWN,
  ArrowLeft: LEFT,
  ArrowRight: RIGHT,
  KeyW: UP,
  KeyS: DOWN,
  KeyA: LEFT,
  KeyD: RIGHT,
};

const ARROWS: { name: string; direction: Point; icon: string }[] = [
  { name: "up", direction: UP, icon: "ri-arrow-up-s-fill" },
  { name: "left", direction: LEFT, icon: "ri-arrow-left-s-fill" },
  { name: "down", direction: DOWN, icon: "ri-arrow-down-s-fill" },
  { name: "right", direction: RIGHT, icon: "ri-arrow-right-s-fill" },
];

const same = (a: Point, b: Point) => a.x === b.x && a.y === b.y;
const opposite = (a: Point, b: Point) => a.x === -b.x && a.y === -b.y;

// Deterministic start position so the server and client render the same board.
const createGame = (): Game => ({
  snake: Array.from({ length: START_LENGTH }, (_, i) => ({ x: 9 - i, y: 15 })),
  direction: RIGHT,
  queue: [],
  food: { x: 14, y: 9 },
  eaten: 0,
  status: "idle",
  startedAt: 0,
  pausedAt: 0,
  endedAt: 0,
  elapsed: 0,
});

/** Picks a random free cell; always terminates, unlike re-rolling until free. */
const randomFood = (snake: Point[]): Point => {
  const taken = new Set(snake.map((p) => p.y * COLS + p.x));
  const free: number[] = [];
  for (let i = 0; i < COLS * ROWS; i++) if (!taken.has(i)) free.push(i);
  const cell = free[Math.floor(Math.random() * free.length)] ?? 0;
  return { x: cell % COLS, y: Math.floor(cell / COLS) };
};

const readBestTime = () => {
  try {
    const value = Number(window.localStorage.getItem(BEST_TIME_KEY));
    return Number.isFinite(value) && value > 0 ? value : null;
  } catch {
    return null;
  }
};

const saveBestTime = (ms: number) => {
  try {
    window.localStorage.setItem(BEST_TIME_KEY, String(Math.round(ms)));
  } catch {
    /* storage can be unavailable in private mode */
  }
};

const isTypingTarget = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

const seconds = (ms: number) => (ms / 1000).toFixed(2);

const SnakeGame: React.FC = () => {
  // Game state lives in a ref so the timer and key handlers always see the
  // latest values; React state is only used to trigger a re-render.
  const gameRef = useRef<Game>(createGame());
  const timerRef = useRef<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const [, setFrame] = useState(0);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [pressed, setPressed] = useState<string | null>(null);

  const rerender = useCallback(() => setFrame((frame) => frame + 1), []);

  const stopLoop = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const finish = useCallback(
    (status: "over" | "won") => {
      const game = gameRef.current;
      stopLoop();
      game.status = status;
      game.endedAt = performance.now();
      game.elapsed = game.endedAt - game.startedAt;
      if (status === "won") {
        const best = readBestTime();
        if (best === null || game.elapsed < best) {
          saveBestTime(game.elapsed);
          setBestTime(game.elapsed);
        }
      }
      rerender();
    },
    [rerender, stopLoop]
  );

  const tick = useCallback(() => {
    const game = gameRef.current;
    if (game.status !== "running") return;

    const next = game.queue.shift();
    if (next) game.direction = next;

    const head = {
      x: game.snake[0].x + game.direction.x,
      y: game.snake[0].y + game.direction.y,
    };
    const eats = same(head, game.food);
    // The tail moves out of the way this tick, so stepping onto it is allowed.
    const body = eats ? game.snake : game.snake.slice(0, -1);
    const hitsWall = head.x < 0 || head.y < 0 || head.x >= COLS || head.y >= ROWS;

    if (hitsWall || body.some((part) => same(part, head))) {
      finish("over");
      return;
    }

    game.snake = [head, ...body];
    if (eats) {
      game.eaten += 1;
      if (game.eaten >= FOOD_TO_WIN) {
        finish("won");
        return;
      }
      game.food = randomFood(game.snake);
    }
    rerender();
  }, [finish, rerender]);

  const startLoop = useCallback(() => {
    stopLoop();
    timerRef.current = window.setInterval(tick, TICK_MS);
  }, [stopLoop, tick]);

  const start = useCallback(
    (direction?: Point) => {
      const game = createGame();
      game.status = "running";
      game.food = randomFood(game.snake);
      // The snake starts facing right; turning straight back would kill it.
      if (direction && !opposite(direction, game.direction)) game.direction = direction;
      game.startedAt = performance.now();
      gameRef.current = game;
      startLoop();
      rerender();
    },
    [rerender, startLoop]
  );

  const pause = useCallback(() => {
    const game = gameRef.current;
    if (game.status !== "running") return;
    stopLoop();
    game.status = "paused";
    game.pausedAt = performance.now();
    game.queue = [];
    rerender();
  }, [rerender, stopLoop]);

  const resume = useCallback(() => {
    const game = gameRef.current;
    if (game.status !== "paused") return;
    game.startedAt += performance.now() - game.pausedAt;
    game.status = "running";
    startLoop();
    rerender();
  }, [rerender, startLoop]);

  const turn = useCallback(
    (direction: Point) => {
      const game = gameRef.current;

      if (game.status === "idle") return start(direction);
      if (game.status === "over" || game.status === "won") {
        if (performance.now() - game.endedAt > RESTART_COOLDOWN_MS) start(direction);
        return;
      }
      if (game.status === "paused") resume();

      const last = game.queue[game.queue.length - 1] ?? game.direction;
      if (same(direction, last) || opposite(direction, last)) return;
      if (game.queue.length < MAX_QUEUED_TURNS) game.queue.push(direction);
    },
    [resume, start]
  );

  const flashArrow = useCallback((direction: Point) => {
    const arrow = ARROWS.find((item) => same(item.direction, direction));
    setPressed(arrow?.name ?? null);
  }, []);

  // Keyboard: arrows or WASD to steer, Space to pause/resume or start.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isTypingTarget(event.target)) return;
      // Ignore input while the game is hidden (small screens).
      if (!rootRef.current || rootRef.current.offsetParent === null) return;

      const direction = DIRECTION_BY_KEY[event.key] ?? DIRECTION_BY_KEY[event.code];
      if (direction) {
        event.preventDefault();
        flashArrow(direction);
        turn(direction);
        return;
      }

      if (event.code === "Space" && !(event.target instanceof HTMLButtonElement)) {
        event.preventDefault();
        const { status } = gameRef.current;
        if (status === "running") pause();
        else if (status === "paused") resume();
        else start();
      }
    };
    const onKeyUp = () => setPressed(null);

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  }, [flashArrow, pause, resume, start, turn]);

  // Pause when the tab or window loses focus instead of dying off-screen.
  useEffect(() => {
    const onHide = () => {
      if (document.hidden) pause();
    };
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("blur", pause);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("blur", pause);
    };
  }, [pause]);

  useEffect(() => {
    setBestTime(readBestTime());
    return stopLoop;
  }, [stopLoop]);

  // Touch and mouse: swipe on the board to steer, tap to start or resume.
  const onPointerDown = (event: React.PointerEvent) => {
    pointerStart.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: React.PointerEvent) => {
    const from = pointerStart.current;
    pointerStart.current = null;
    if (!from) return;
    const dx = event.clientX - from.x;
    const dy = event.clientY - from.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 16) {
      const { status } = gameRef.current;
      if (status === "paused") resume();
      else if (status !== "running") turn(RIGHT);
      return;
    }
    turn(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? RIGHT : LEFT) : dy > 0 ? DOWN : UP);
  };

  const game = gameRef.current;
  const head = game.snake[0];
  const headRadius = same(game.direction, RIGHT)
    ? "0 50% 50% 0"
    : same(game.direction, LEFT)
    ? "50% 0 0 50%"
    : same(game.direction, DOWN)
    ? "0 0 50% 50%"
    : "50% 50% 0 0";

  const cellStyle = (point: Point): React.CSSProperties => ({
    left: `${(point.x / COLS) * 100}%`,
    top: `${(point.y / ROWS) * 100}%`,
    width: `${100 / COLS}%`,
    height: `${100 / ROWS}%`,
  });

  return (
    <div className='snake-game' ref={rootRef}>
      <div
        className='game-board'
        role='application'
        aria-label='Snake game: use the arrow keys or WASD to steer, Space to pause'
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (pointerStart.current = null)}
      >
        {game.snake.map((part, index) => (
          <div
            key={index}
            className={`snake-segment ${index === 0 ? "head" : ""}`}
            style={{
              ...cellStyle(part),
              backgroundColor: `rgba(67, 217, 173, ${1 - (index / game.snake.length) * 0.85})`,
              borderRadius: index === 0 ? headRadius : undefined,
            }}
          />
        ))}
        <div className='food' style={cellStyle(game.food)} />

        {game.status === "idle" && (
          <button type='button' className='start-button' onClick={() => start()}>
            start-game
          </button>
        )}

        {game.status === "paused" && (
          <div className='game-overlay'>
            <p>// paused</p>
            <button type='button' className='restart-button' onClick={resume}>
              _resume
            </button>
          </div>
        )}

        {(game.status === "over" || game.status === "won") && (
          <div className='game-overlay'>
            <p>
              {game.status === "won"
                ? `WELL DONE! Your time: ${seconds(game.elapsed)} s`
                : "GAME OVER!"}
            </p>
            {game.status === "won" && bestTime !== null && (
              <p className='best-time'>// best: {seconds(bestTime)} s</p>
            )}
            <button type='button' className='restart-button' onClick={() => start()}>
              _play-again
            </button>
          </div>
        )}

        <span className='sr-only' aria-live='polite'>
          {game.status === "over"
            ? "Game over"
            : game.status === "won"
            ? `You won in ${seconds(game.elapsed)} seconds`
            : `Head at column ${head.x + 1}, row ${head.y + 1}`}
        </span>
      </div>

      <div className='game-info'>
        <div className='controls'>
          <div className='description'>
            <p>// use keyboard</p>
            <p>// arrows or WASD</p>
            <p>// space to pause</p>
          </div>
          <div className='arrow-container'>
            {ARROWS.map((arrow) => (
              <button
                key={arrow.name}
                type='button'
                className={`arrow ${pressed === arrow.name ? "pressed" : ""}`}
                aria-label={`Turn ${arrow.name}`}
                onPointerDown={(event) => {
                  event.preventDefault();
                  setPressed(arrow.name);
                  turn(arrow.direction);
                }}
                onPointerUp={() => setPressed(null)}
                onPointerLeave={() => setPressed(null)}
              >
                <i className={arrow.icon} aria-hidden='true'></i>
              </button>
            ))}
          </div>
        </div>

        <div className='food-count-container'>
          <p className='description'>// food left</p>
          <div className='food-count'>
            {Array.from({ length: FOOD_TO_WIN }, (_, index) => (
              <div
                key={index}
                className={`food-indicator ${index < game.eaten ? "eaten" : ""}`}
              />
            ))}
          </div>
          {bestTime !== null && <p className='description'>// best: {seconds(bestTime)} s</p>}
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;
