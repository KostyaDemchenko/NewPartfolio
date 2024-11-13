// pages/experience.js

import React from "react";

// ваши импорты компонентов
import HeadComponent from "@/src/components/Head";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import Anchors from "@/src/components/Anchors";
import CV from "@/src/components/CV";

// стили
import "@/src/app/global.scss";
import "./style.scss";

export default function Experience() {
  return (
    <div className='hero'>
      <HeadComponent />
      <section className='container'>
        <Header />
        <main className='hero-main'>
          <Anchors />
          <CV />
        </main>
        <Footer />
      </section>
    </div>
  );
}
