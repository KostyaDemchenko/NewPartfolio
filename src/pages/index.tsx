import React from "react";

// components
import HeadComponent from "@/src/components/Head";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import AboutMeMain from "@/src/components/AboutMeMain";
import SnakeGame from "@/src/components/SnakeGame";

// styles
import "@/src/app/global.scss";

export default function Home() {
  return (
    <div className='hero'>
      <HeadComponent />
      <section className='container'>
        <Header />
        <main className='hero-main'>
          <div className='blur-circle-one'></div>
          <div className='blur-circle-two'></div>
          <AboutMeMain />
          <SnakeGame />
        </main>
        <Footer />
      </section>
    </div>
  );
}
