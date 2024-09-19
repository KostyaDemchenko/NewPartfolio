import React from "react";

// components
import HeadComponent from "@/src/components/Head";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";

// styles
import "@/src/app/global.scss";

export default function experience() {
  return (
    <div className='hero'>
      <HeadComponent />
      <section className='container'>
        <Header />
        <main className='hero-main'></main>
        <Footer />
      </section>
    </div>
  );
}
