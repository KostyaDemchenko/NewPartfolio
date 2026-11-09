
import HeadComponent from "@/src/components/Head";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import Anchors from "@/src/components/Anchors";
import CV from "@/src/components/CV";

import "./style.scss";

export default function Experience() {
  return (
    <div className='hero'>
      <HeadComponent
        pageTitle='Experience'
        pageDescription='Experience of Kostiantyn Demchenko, Front-End Developer: 4+ years with Vue 3, Next.js, React and TypeScript.'
        path='/experience'
      />
      <section className='main-container'>
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
