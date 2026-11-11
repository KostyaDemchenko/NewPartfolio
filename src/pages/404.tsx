import HeadComponent from "@/src/components/Head";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import NotFound from "@/src/components/NotFound";

export default function NotFoundPage() {
  return (
    <div className='hero'>
      <HeadComponent
        pageTitle='Page not found'
        pageDescription='This page does not exist. Kostiantyn Demchenko, Front-End Developer: projects, experience and contacts.'
        noIndex
      />
      <section className='main-container'>
        <Header />
        <main className='hero-main'>
          <div className='blur-circle-one'></div>
          <div className='blur-circle-two'></div>
          <NotFound />
        </main>
        <Footer />
      </section>
    </div>
  );
}
