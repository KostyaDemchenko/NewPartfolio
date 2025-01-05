import HeadComponent from "@/src/components/Head";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import AboutMeMain from "@/src/components/AboutMeMain";
import SnakeGame from "@/src/components/SnakeGame";

import "@/src/app/global.scss";

export default function Home() {
  return (
    <div className='hero'>
      <HeadComponent />
      <section className='main-container'>
        <Header />
        <main className='hero-main'>
          <div className='blur-circle-one'></div>
          <div className='blur-circle-two'></div>
          <div className='container'>
            <AboutMeMain />
            <SnakeGame />
          </div>
        </main>
        <Footer />
      </section>
    </div>
  );
}
