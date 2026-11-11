import React, { useState } from "react";

import HeadComponent from "@/src/components/Head";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import Accordion from "@/src/components/Accordion";
import ContactForm from "@/src/components/ContactForm";
import EmailLink from "@/src/components/EmailLink";
import RealTimePreview from "@/src/components/RealTimePreview";
import { CONTACTS } from "@/src/data/contacts";

import "./style.scss";

export default function ContactMe() {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: "",
  });

  return (
    <div className='hero'>
      <HeadComponent
        pageTitle='Contact Me'
        pageDescription='Contact Kostiantyn Demchenko, Front-End Developer: email, Telegram, LinkedIn or the contact form.'
        path='/contact_me'
      />
      <section className='main-container'>
        <Header />
        <main className='hero-main'>
          <div className='blur-circle-one'></div>
          <div className='blur-circle-two'></div>
          <div className='accordion-container'>
            <Accordion title='contact' show>
              <ul>
                <li>
                  <EmailLink />
                </li>
                <li>
                  <a href={CONTACTS.phone.href}>
                    <i className='ri-phone-fill' aria-hidden='true'></i>
                    {CONTACTS.phone.label}
                  </a>
                </li>
                <li>
                  <a href={CONTACTS.telegram.href} target='_blank' rel='noopener noreferrer'>
                    <i className='ri-telegram-fill' aria-hidden='true'></i>
                    {CONTACTS.telegram.label}
                  </a>
                </li>
                <li>
                  <a href={CONTACTS.linkedin} target='_blank' rel='noopener noreferrer'>
                    <i className='ri-linkedin-box-fill' aria-hidden='true'></i>
                    linkedin
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
