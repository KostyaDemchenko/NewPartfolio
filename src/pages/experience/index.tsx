import { SpeedInsights } from "@vercel/speed-insights/next";

import HeadComponent from "@/src/components/Head";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import Anchors from "@/src/components/Anchors";
import CV from "@/src/components/CV";

import "@/src/app/global.scss";
import "./style.scss";

export default function Experience() {
  return (
    <div className='hero'>
      <HeadComponent
        pageTitle='Experience'
        pageDescription='Personal portfolio Kostiantyn Demchenko / Experience'
      />
      <section className='main-container'>
        <Header />
        <main className='hero-main'>
          <Anchors />
          <CV />
        </main>
        <Footer />
      </section>
      <SpeedInsights />
    </div>
  );
}
