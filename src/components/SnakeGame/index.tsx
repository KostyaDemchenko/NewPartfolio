import React, { useEffect, useState, useRef } from "react";
import "./style.scss";

type Position = { x: number; y: number };

const BOARD_WIDTH = 20; // количество колонок
const BOARD_HEIGHT = 30; // количество строк
const INITIAL_SNAKE_LENGTH = 5; // начальная длина змейки
const WINNING_FOOD_COUNT = 8; // количество еды для победы
const SEGMENT_SIZE = 20; // размер сегмента и еды в пикселях

// Фиксированные начальные позиции для серверного рендеринга.
// Пусть змейка будет по центру, а еда неподалёку.
const FIXED_INITIAL_SNAKE: Position[] = Array.from(
  { length: INITIAL_SNAKE_LENGTH },
  (_, i) => ({
    x: 10 - i,
    y: 10,
  })
);

const FIXED_INITIAL_FOOD: Position = { x: 5, y: 10 };

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>(FIXED_INITIAL_SNAKE);
  const [food, setFood] = useState<Position>(FIXED_INITIAL_FOOD);
  const [direction, setDirection] = useState<Position>({ x: 1, y: 0 });
  const [isGameOver, setIsGameOver] = useState(false);
  const [foodEaten, setFoodEaten] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const gameBoardRef = useRef<HTMLDivElement>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [directionChanged, setDirectionChanged] = useState(false);

  function generateInitialSnake(): Position[] {
    return Array.from({ length: INITIAL_SNAKE_LENGTH }, (_, i) => ({
      x: 10 - i,
      y: 10,
    }));
  }

  const generateFood = (snakePositions: Position[]): Position => {
    let newFoodPosition: Position;
    do {
      newFoodPosition = {
        x: Math.floor(Math.random() * BOARD_WIDTH),
        y: Math.floor(Math.random() * BOARD_HEIGHT),
      };
    } while (
      snakePositions.some(
        (segment) =>
          segment.x === newFoodPosition.x && segment.y === newFoodPosition.y
      )
    );
    return newFoodPosition;
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      const arrowKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

      if (!gameStarted) {
        if (arrowKeys.includes(key)) {
          startGame();
        }
        return;
      }

      if (isGameOver) {
        if (arrowKeys.includes(key)) {
          resetGame();
        }
        return;
      }

      if (!directionChanged) {
        const newDirection = getNewDirection(key, direction);
        if (newDirection && isValidDirectionChange(newDirection, direction)) {
          setDirection(newDirection);
          setDirectionChanged(true);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [direction, gameStarted, isGameOver, directionChanged]);

  useEffect(() => {
    if (isGameOver || !gameStarted) return;

    const gameInterval = setInterval(() => {
      moveSnake();
      setDirectionChanged(false);
    }, 100);

    return () => clearInterval(gameInterval);
  }, [snake, direction, isGameOver, gameStarted]);

  const startGame = () => {
    // Генерируем новые позиции уже на клиенте
    const initialSnake = generateInitialSnake();
    const initialFood = generateFood(initialSnake);

    setSnake(initialSnake);
    setFood(initialFood);
    setGameStarted(true);
    setIsGameOver(false);
    setDirection({ x: 1, y: 0 });
    setStartTime(Date.now());
    setFoodEaten(0);
  };

  const moveSnake = () => {
    const newSnake = [...snake];
    const head = {
      x: newSnake[0].x + direction.x,
      y: newSnake[0].y + direction.y,
    };

    if (checkCollision(head)) {
      endGame();
      return;
    }

    newSnake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      const newFood = generateFood(newSnake);
      setFood(newFood);
      setFoodEaten(foodEaten + 1);
      if (foodEaten + 1 === WINNING_FOOD_COUNT) {
        endGame(true);
        return;
      }
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  const checkCollision = (position: Position): boolean => {
    return (
      position.x < 0 ||
      position.y < 0 ||
      position.x >= BOARD_WIDTH ||
      position.y >= BOARD_HEIGHT ||
      snake.some(
        (segment) => segment.x === position.x && segment.y === position.y
      )
    );
  };

  const endGame = (win = false) => {
    setIsGameOver(true);
    setGameStarted(false);
    setDirection({ x: 1, y: 0 });
    if (win && startTime) {
      setElapsedTime(Date.now() - startTime);
    }
  };

  const resetGame = () => {
    // Возвращаемся к фиксированным позициям для предсказуемого состояния
    setSnake(FIXED_INITIAL_SNAKE);
    setFood(FIXED_INITIAL_FOOD);
    setDirection({ x: 1, y: 0 });
    setGameStarted(false);
    setIsGameOver(false);
    setFoodEaten(0);
    setElapsedTime(0);
    setStartTime(null);
  };

  const getNewDirection = (
    key: string,
    currentDirection: Position
  ): Position | null => {
    switch (key) {
      case "ArrowUp":
        return { x: 0, y: -1 };
      case "ArrowDown":
        return { x: 0, y: 1 };
      case "ArrowLeft":
        return { x: -1, y: 0 };
      case "ArrowRight":
        return { x: 1, y: 0 };
      default:
        return null;
    }
  };

  const isValidDirectionChange = (
    newDirection: Position,
    currentDirection: Position
  ): boolean => {
    // Запрещаем движение в обратную сторону
    return !(
      (newDirection.x === -currentDirection.x && newDirection.x !== 0) ||
      (newDirection.y === -currentDirection.y && newDirection.y !== 0)
    );
  };

  const getOpacity = (index: number, length: number) => {
    return 1 - index / length;
  };

  const getBorderRadius = (index: number): string => {
    if (index !== 0) return "0";

    if (direction?.x === 1) return "0 50% 50% 0";
    if (direction?.x === -1) return "50% 0 0 50%";
    if (direction?.y === 1) return "0 0 50% 50%";
    if (direction?.y === -1) return "50% 50% 0 0";
    return "0";
  };

  return (
    <div className='snake-game'>
      <div className='game-board' ref={gameBoardRef}>
        {snake.map((segment, index) => (
          <div
            key={index}
            className='snake-segment'
            style={{
              left: `${segment.x * SEGMENT_SIZE}px`,
              top: `${segment.y * SEGMENT_SIZE}px`,
              backgroundColor: `rgba(67, 217, 173, ${getOpacity(
                index,
                snake.length
              )})`,
              borderRadius: getBorderRadius(index),
            }}
          ></div>
        ))}
        {food && (
          <div
            className='food'
            style={{
              left: `${food.x * SEGMENT_SIZE}px`,
              top: `${food.y * SEGMENT_SIZE}px`,
            }}
          ></div>
        )}
      </div>
      <div className='game-info'>
        <div className='controls'>
          <div className='description'>
            <p>// use keyboard</p>
            <p>// arrows to play</p>
          </div>
          <div className='arrow-container'>
            <div className='arrow'>
              <i className='ri-arrow-up-s-fill'></i>
            </div>
            <div className='arrow'>
              <i className='ri-arrow-left-s-fill'></i>
            </div>
            <div className='arrow'>
              <i className='ri-arrow-down-s-fill'></i>
            </div>
            <div className='arrow'>
              <i className='ri-arrow-right-s-fill'></i>
            </div>
          </div>
        </div>

        <div className='food-count-container'>
          <p className='description'>// food left</p>
          <div className='food-count'>
            {Array.from({ length: WINNING_FOOD_COUNT }).map((_, index) => (
              <div
                key={index}
                className={`food-indicator ${index < foodEaten ? "eaten" : ""}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
      {!gameStarted && !isGameOver && (
        <button className='start-button' onClick={startGame}>
          start-game
        </button>
      )}
      {isGameOver && (
        <div className='game-over'>
          <p>
            {foodEaten === WINNING_FOOD_COUNT
              ? `WELL DONE! Your time: ${(elapsedTime / 1000).toFixed(
                  2
                )} seconds`
              : "GAME OVER!"}
          </p>
          <button className='restart-button' onClick={resetGame}>
            _restart
          </button>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
