import React from "react";
import TuringType from "@/src/components/TuringType"; // Импортируем наш новый компонент
import "./style.scss";

const AboutMeMain = () => {
  return (
    <div className='about-me-container'>
      <div className='about-me-description'>
        {/* Используем TuringType для отображения текста с эффектом печати */}
        <TuringType
          el='p'
          className='description'
          text='Hi all. I am'
          speed={70}
        />
        <TuringType
          el='h1'
          className='name'
          text='Kostiantyn Demchenko'
          speed={80}
        />
        <TuringType
          el='p'
          className='job-title'
          text='>Frontend developer'
          speed={90}
        />
      </div>
      <div className='about-me-links'>
        <TuringType
          el='p'
          className='description'
          text='// you can also see my Github page'
          speed={70}
        />
        <p className='github-link'>
          <TuringType el='span' className='blue' text='const' speed={50} />
          <TuringType
            el='span'
            className='green'
            text=' githubLink'
            speed={60}
          />
          <span> = </span>
          <TuringType
            el='a'
            className='orange'
            text='"https://github.com/KostyaDemchenko/"'
            href='https://github.com/KostyaDemchenko/'
            target='_blank'
            speed={60}
          />
        </p>
      </div>
    </div>
  );
};

export default AboutMeMain;
