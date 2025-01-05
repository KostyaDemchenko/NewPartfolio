// pages/projects.tsx

import React, { useState } from "react";
import HeadComponent from "@/src/components/Head";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import Accordion from "@/src/components/Accordion";

import "@/src/app/global.scss";
import "./style.scss";

export default function Projects() {
  return (
    <div className='hero'>
      <HeadComponent />
      <section className='main-container'>
        <Header />
        <main className='hero-main'>
          <div className='accordion-container'>
            <Accordion title='filters' show>
              <div className='test'></div>
              {/* here should be dynamic filters (every filter shol be likr a checkbox with label) */}
              {/* dynamic filters mean that I will view all the options in the "technologies" field in each project object and substitute them here, I will filter using the URL */}
              {/* small note update the incoming data handler so that I can make a request to /api/pojects - and here is the selected filter */}
              {/* small note dont forget to do a checkbox component with lable*/}
            </Accordion>
          </div>
          {/* here should be container with projects  */}
          {/* small note don`t forget to do a sceleton  */}
        </main>
        <Footer />
      </section>
    </div>
  );
}
