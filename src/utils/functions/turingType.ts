export class TuringType {
  private int = 100;
  private accuracy = 0.95;
  private keys = "qwertyuiopasdfghjklzxcvbnm,./;-=[]".split("");
  private el: HTMLElement | HTMLInputElement | HTMLTextAreaElement;
  private text: string;
  private attr: "value" | "innerText";
  private len: number;
  private i = 0;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private callback?: () => void;

  constructor(
    el: HTMLElement | string,
    text: string,
    options: {
      interval?: number;
      accuracy?: number;
      callback?: () => void;
    } = {}
  ) {
    this.el =
      typeof el === "string" ? (document.querySelector(el) as HTMLElement) : el;
    this.text = text;
    this.len = this.text.length;

    const { interval, accuracy, callback } = options;
    this.accuracy = accuracy ?? this.accuracy;
    this.int = interval ?? this.int;
    this.callback = callback;

    const tag = this.el.tagName.toLowerCase();
    if (tag === "textarea" || tag === "input") {
      this.attr = "value";
      (this.el as HTMLInputElement | HTMLTextAreaElement).focus();
    } else {
      this.attr = "innerText";
    }

    this.type();
  }

  private type = () => {
    if (this.i === this.len + 1) {
      this.callback?.();
      return;
    }

    if (Math.random() > this.accuracy) {
      this.setText(
        this.text.slice(0, this.i) +
          this.keys[Math.floor(Math.random() * this.keys.length)]
      );
      this.timer = setTimeout(() => {
        this.setText(this.text.slice(0, this.i));
        this.timer = setTimeout(
          this.type,
          Math.random() * this.int + this.int * 0.8
        );
      }, this.int * 1.5);
    } else {
      this.setText(this.text.slice(0, this.i++));
      this.timer = setTimeout(this.type, this.calculateInterval());
    }
  };

  private setText(value: string) {
    if (this.attr === "value") {
      (this.el as HTMLInputElement | HTMLTextAreaElement).value = value; // Уточняем тип элемента
    } else {
      this.el.innerText = value;
    }
  }

  private calculateInterval() {
    let t = Math.random() * this.int + this.int * 0.1;
    if (this.text[this.i] === " ") t += Math.random() * this.int;
    if (this.text[this.i] === "." || this.text[this.i] === ",")
      t += Math.random() * this.int * 3;
    if (Math.random() > 0.97) t += this.int * 2;
    if (Math.random() > 0.95) t += this.int;
    return t;
  }

  pause() {
    if (this.timer) clearTimeout(this.timer);
  }

  clear(n: number = this.len) {
    if (n === -2) return;
    this.setText(this.text.slice(0, this.i--));
    setTimeout(this.clear.bind(this, --n), Math.random() * this.int);
  }
}
