// pages/experience.js (или .tsx, если используете TS в папке pages)
import React, { useState } from "react";
import HeadComponent from "@/src/components/Head";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import Accordion from "@/src/components/Accordion";
import ContactForm from "@/src/components/ContactForm";
import RealTimePreview from "@/src/components/RealTimePreview";

import "@/src/app/global.scss";
import "./style.scss";

export default function Experience() {
  // Храним актуальные данные для передачи в RealTimePreview
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: "",
  });

  return (
    <div className='hero'>
      <HeadComponent />
      <section className='main-container'>
        <Header />
        <main className='hero-main'>
          <div className='accordion-container'>
            <Accordion title='contact' show>
              <ul>
                <li>
                  <a href='mailto:kostiantyn.demchenko.work@gmail.com'>
                    <i className='ri-mail-fill'></i>
                    kostiantyn.demchenko.work@gmail.com
                  </a>
                </li>
                <li>
                  <a href='tel:+380989122846'>
                    <i className='ri-phone-fill'></i>
                    +380 98 91 22 846
                  </a>
                </li>
                <li>
                  <a href='https://t.me/amateur_japanese_animation'>
                    <i className='ri-telegram-fill'></i>
                    telegram
                  </a>
                </li>
              </ul>
            </Accordion>
          </div>
          <div className='contact-container'>
            <ContactForm onChange={(newValues) => setContactData(newValues)} />
            <RealTimePreview
              name={contactData.name}
              email={contactData.email}
              message={contactData.message}
            />
          </div>
        </main>
        <Footer />
      </section>
    </div>
  );
}
