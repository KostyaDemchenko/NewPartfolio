import React from "react";
import Link from "next/link";
import TuringType from "@/src/components/TuringType";
import { CV_PDF_PATH } from "@/src/data/contacts";
import "./style.scss";

const AboutMeMain = () => {
  return (
    <div className='about-me-container'>
      <div className='about-me-description'>
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
          text='> Front-End Developer · Vue · Next.js'
          speed={90}
        />
        <nav className='about-me-actions' aria-label='Quick links'>
          <Link href='/projects' className='action primary'>
            <i className='ri-folder-open-line' aria-hidden='true'></i>
            _view-projects
          </Link>
          <a className='action' href={CV_PDF_PATH} target='_blank' rel='noopener noreferrer' download>
            <i className='ri-file-download-line' aria-hidden='true'></i>
            _download-cv.pdf
          </a>
        </nav>
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
            rel='noopener noreferrer'
            speed={60}
          />
        </p>
      </div>
    </div>
  );
};

export default AboutMeMain;
