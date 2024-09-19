import React, { useEffect, useRef } from "react";
import { TuringType } from "@/src/utils/functions/turingType";

type TextTags = "p" | "span" | "a" | "h1" | "h2" | "h3" | "h4";

type TuringTypeProps<T extends TextTags> = {
  el: T; // Ограничиваем только текстовыми тегами
  className?: string;
  text: string;
  speed?: number;
  accuracy?: number;
  callback?: () => void;
  href?: string; // Пропс для ссылки
  target?: string; // Пропс для target
};

function TuringTypeText<T extends TextTags>({
  el,
  className,
  text,
  speed = 100,
  accuracy = 0.95,
  callback,
  href, // Для ссылок
  target, // Для target
}: TuringTypeProps<T>) {
  // Определяем тип элемента на основе переданного тега
  type ElementType = T extends "a"
    ? HTMLAnchorElement
    : T extends "p"
    ? HTMLParagraphElement
    : T extends "span"
    ? HTMLSpanElement
    : T extends "h1" | "h2" | "h3" | "h4"
    ? HTMLHeadingElement
    : HTMLElement;

  const elementRef = useRef<ElementType | null>(null);

  useEffect(() => {
    if (elementRef.current) {
      new TuringType(elementRef.current as HTMLElement, text, {
        interval: speed,
        accuracy: accuracy,
        callback: callback,
      });
    }
  }, [text, speed, accuracy, callback]);

  const commonProps = {
    className,
    ref: elementRef,
  };

  if (el === "a") {
    return (
      <a
        href={href}
        target={target}
        {...(commonProps as React.RefAttributes<HTMLAnchorElement> &
          React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      ></a>
    );
  } else {
    return React.createElement(
      el,
      commonProps as React.RefAttributes<ElementType> &
        React.HTMLAttributes<ElementType>
    );
  }
}

export default TuringTypeText;
