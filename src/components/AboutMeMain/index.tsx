import React, { useEffect } from "react";
import { TuringType } from "@/src/utils/functions/turingType";
import "./style.scss";

const AboutMeMain = () => {
  useEffect(() => {
    // Обработчик для анимации печати текста
    const startTypingEffect = (
      selector: string,
      text: string,
      interval: number
    ) => {
      const element = document.querySelector(selector) as HTMLElement | null;
      if (element) {
        new TuringType(element, text, {
          interval,
          accuracy: 0.95,
        });
      }
    };

    // Анимация печати для всех текстовых элементов
    startTypingEffect(".description", "Hi all. I am", 70);
    startTypingEffect(".name", "Kostinatyn Demchenko", 80);
    startTypingEffect(".job-title", ">Fronted developer", 90);
    startTypingEffect(
      ".about-me-links .description",
      "// you can also see my Github page",
      70
    );

    // Отдельная анимация для каждого подэлемента в .github-link
    startTypingEffect(".github-link .blue", "const", 50); // Оставляем пустым
    startTypingEffect(".github-link .green", "githubLink", 60);
    startTypingEffect(
      ".github-link .orange",
      '"https://github.com/KostyaDemchenko/"',
      60
    );
  }, []); // запускаем один раз после монтирования компонента

  return (
    <div className='about-me-container'>
      <div className='about-me-description'>
        <p className='description'></p>
        {/* пустой изначально, наполняется текстом с помощью TuringType */}
        <h1 className='name'></h1>
        {/* пустой изначально, наполняется текстом с помощью TuringType */}
        <p className='job-title'></p>
        {/* пустой изначально, наполняется текстом с помощью TuringType */}
      </div>
      <div className='about-me-links'>
        <p className='description'></p>
        {/* пустой изначально, наполняется текстом с помощью TuringType */}
        <p className='github-link'>
          <span className='blue'></span> <span className='green'></span>
          <span> = </span>
          <a className='orange' href='https://github.com/KostyaDemchenko/'>
            {/* Здесь тоже пусто, текст добавляется с помощью TuringType */}
          </a>
        </p>
      </div>
    </div>
  );
};

export default AboutMeMain;
