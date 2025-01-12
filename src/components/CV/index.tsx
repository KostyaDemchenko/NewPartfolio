import "./style.scss";

const CV = () => {
  return (
    <div className='cv-container'>
      {/* CV Header */}
      <div className='cv-header'>
        <h1>Kostiantyn Demchenko</h1>
        <h2>Front-End Developer</h2>
      </div>

      {/* About Me */}
      <section className='about-me' id='about-me'>
        <h3>About me</h3>
        <p>
          Highly motivated Front-End Developer with 1.5 years of experience
          creating modern, responsive, and user-friendly websites and web
          applications. Skilled in Next.JS, React, TypeScript, JavaScript,
          SCSS/CSS, and HTML. I am looking for a role in a dynamic, active team.
        </p>
      </section>

      {/* Skills */}
      <section className='skills' id='skills'>
        <h3>About my skills</h3>
        <ul>
          <li>Next.JS</li>
          <li>React</li>
          <li>TypeScript</li>
          <li>SCSS, Tailwind, Bootstrap 5</li>
          <li>HTML, CSS, JavaScript</li>
          <li>i18n</li>
          <li>jQuery</li>
          <li>SQL</li>
          <li>Gulp</li>
          <li>Git</li>
          <li>Adaptive design</li>
          <li>Cross-browser compatibility</li>
          <li>Developer experience design (UI/UX)</li>
        </ul>
      </section>

      {/* Experience */}
      <section className='experience' id='experience'>
        <h3>Experience</h3>

        {/* 1. Front End Web Developer at AdversterX */}
        <div className='job'>
          <h4>Front End Web Developer – AdversterX</h4>
          <p>Aug 2024 - Feb 2025, Ukraine</p>
          <p>
            I worked as a Frontend Web Developer, where my main responsibilities
            included creating modern, responsive websites using the company’s
            established tech stack. I was involved at every stage—from writing
            clean, well-structured code to conducting thorough testing and
            ultimately deploying each project to a live domain.
          </p>
          <p>
            Within our dynamic team setting, I regularly coordinated with the
            team lead to clarify requirements and align on objectives. After
            completing my assigned tasks, I submitted them for both peer and QA
            review, incorporating any feedback to ensure top-notch quality and
            performance. Once all revisions were addressed, I finalized and
            deployed the features to the production environment.
          </p>
          <p>
            This collaborative, step-by-step workflow allowed us to consistently
            meet project deadlines while maintaining the highest standards of
            user experience and technical excellence.
          </p>
        </div>

        {/* 2. Full Stack Developer at Rooh */}
        <div className='job'>
          <h4>Full Stack Developer – Rooh</h4>
          <p>Jun 2024 - Sep 2025, Ukraine</p>
          <p>
            I worked as an outsourced Full Stack Developer, tasked with a
            complete overhaul of the existing website. The goal was to retain
            its core functionality while introducing new features such as a
            feedback form, multi-language support, traffic analytics, enhanced
            user experience, faster loading speeds, and improved SEO for broader
            reach.
          </p>
          <p>
            My responsibilities included collaborating closely with the designer
            to research, analyze, and shape the site’s new design. I then
            coordinated with the application developers to preserve the old
            site’s functionality, rewriting it using modern technologies. I
            selected Next.js, TypeScript, SCSS, NodeMailer, and Swiper.js as the
            technology stack. Additionally, I implemented targeted SEO
            improvements, boosting the site’s search engine ranking.
          </p>
          <p>
            After thorough testing, the final step was rapidly deploying the
            updated site to the existing domain, ensuring a seamless transition
            for users without any disruptions.
          </p>
        </div>

        {/* 3. Full Stack Developer at Tap Skins */}
        <div className='job'>
          <h4>Full Stack Developer – Tap Skins</h4>
          <p>Jun 2024 - Aug 2024, Ukraine</p>
          <p>
            My contribution to the project can be divided into the following
            stages:
          </p>
          <ol>
            <li>
              <strong>Technology:</strong> Next.js, SCSS, TypeScript, Express,
              Notion, and MariaDB for a Telegram mini-app.
            </li>
            <li>
              <strong>Frontend &amp; Backend Development:</strong> Developed a
              responsive user interface using React, SCSS, and TypeScript, and
              implemented efficient data fetching and caching on the backend.
            </li>
            <li>
              <strong>Database &amp; API Management:</strong> Integrated MariaDB
              as the primary database, established APIs for data flow between
              the client and server, and optimized queries for large datasets.
            </li>
            <li>
              <strong>Design Collaboration:</strong> Collaborated closely with
              the UI/UX designer to ensure optimal implementation of the design.
            </li>
            <li>
              <strong>Project &amp; Task Management:</strong> Created a detailed
              project plan, tracked milestones using JIRA, and ensured progress
              was on schedule.
            </li>
            <li>
              <strong>Server Deployment &amp; Hosting:</strong> Configured
              environments, conducted tests on Vercel, and deployed on the
              client’s hosting; performed final testing within Telegram.
            </li>
            <li>
              <strong>Performance &amp; Security:</strong> Implemented caching
              strategies to enhance loading speed, managed API authentication,
              and safeguarded sensitive data.
            </li>
          </ol>
        </div>

        {/* 4. Front End Developer at Ai Go */}
        <div className='job'>
          <h4>Front End Developer – Ai Go</h4>
          <p>Mar 2024 - May 2024, Ukraine</p>
          <p>
            My contribution to the project can be divided into the following
            stages:
          </p>
          <ol>
            <li>
              <strong>Tech Stack Adoption:</strong> When I joined, the core
              technologies—Next.js, SCSS, TypeScript, Sanity.io (for CRM), and
              MariaDB—were already chosen. I collaborated with the team to fully
              understand and leverage these tools for the project’s advancement.
            </li>
            <li>
              <strong>Design Enhancement:</strong> Working closely with our
              design team, we refined the existing design using Figma, ensuring
              a more intuitive, user-friendly interface.
            </li>
            <li>
              <strong>Project Planning:</strong> Together, we created a detailed
              plan to track tasks and manage deadlines, covering both the main
              site and the administrative panel.
            </li>
            <li>
              <strong>Front-End &amp; Back-End Development:</strong> Our team
              collectively developed front-end and back-end features, utilizing
              TypeScript for request caching and performance optimization.
            </li>
          </ol>
        </div>

        {/* 5. Front End Developer/Team Manager at Outside Officialy */}
        <div className='job'>
          <h4>Front End Developer/Team Manager – Outside Officialy</h4>
          <p>Oct 2023 - Mar 2024, Ukraine</p>
          <p>
            <strong>Needs &amp; Competitor Research:</strong> Assessed client
            requirements, user expectations, and market alternatives to guide
            functionality and design.
          </p>
          <p>
            <strong>Work Plan:</strong> Created a Jira roadmap for two websites:
            a main site for the latest group info and an admin panel for content
            editing.
          </p>
          <p>
            <strong>Design &amp; Tech:</strong> Planned user-friendly site
            architecture and selected Next.js, TypeScript, and Tailwind CSS/SCSS
            for the front end, with MySQL/PHP on the back end.
          </p>
          <p>
            <strong>Hosting &amp; Domain:</strong> Configured a VPS server and
            purchased outside-official.com for online availability.
          </p>
          <p>
            <strong>Team Management:</strong>
          </p>
          <ul>
            <li>Reviewed tasks for alignment with requirements.</li>
            <li>Assigned tasks based on priority and expertise.</li>
            <li>Monitored pull requests for code quality and consistency.</li>
          </ul>
          <p>
            This role allowed me to refine project management, team leadership,
            and front-end development skills, while also gaining experience in
            technology selection and deployment.
          </p>
        </div>

        {/* 6. Front End Developer at BonnyFlowers */}
        <div className='job'>
          <h4>Front End Developer – BonnyFlowers</h4>
          <p>Feb 2023 - Aug 2023, Ukraine</p>
          <p>
            I focused on designing and developing modern, responsive web
            interfaces that adapt to multiple devices and browsers. My role
            involved:
          </p>
          <ul>
            <li>
              <strong>HTML:</strong> Creating semantic markup to improve
              accessibility and SEO
            </li>
            <li>
              <strong>CSS:</strong> Building responsive layouts, animations, and
              transitions to enhance user experiences
            </li>
            <li>
              <strong>JavaScript:</strong> Implementing interactive features,
              managing DOM events, and using AJAX for server communication
            </li>
            <li>
              <strong>REST API:</strong> Integrating with back-end services via
              JSON data exchange
            </li>
            <li>
              <strong>Bootstrap:</strong> Leveraging prebuilt components and
              grids for rapid development
            </li>
            <li>
              <strong>jQuery:</strong> Simplifying DOM manipulation, event
              handling, and AJAX requests
            </li>
            <li>
              <strong>Git &amp; Jira:</strong> Collaborating with team members,
              version-controlling code, splitting tasks into manageable chunks,
              and tracking progress
            </li>
          </ul>
          <p>
            Throughout the project, I emphasized performance optimization,
            adherence to development best practices, and close collaboration
            with the team to meet project goals.
          </p>
        </div>

        {/* 7. Front End Developer (Freelance) */}
        <div className='job'>
          <h4>Front End Developer – Freelance</h4>
          <p>May 2022 - Aug 2022, Ukraine</p>
          <ul>
            <li>
              Collaborated with a team of designers, developers, and
              stakeholders to create.
            </li>
            <li>
              Developed convenient and visually attractive user interfaces using
              HTML, CSS, and JavaScript.
            </li>
            <li>Designed reusable components using jQuery.</li>
            <li>
              Implemented adaptive design technologies to ensure optimal viewing
              on all devices.
            </li>
            <li>
              Maintained code quality and organization using Git and GitHub.
            </li>
          </ul>
        </div>
      </section>

      {/* Education / Courses */}
      <section className='education' id='education'>
        <h3>Education / Courses</h3>
        <div className='education-item'>
          <h4>Kharkiv National University of Radio Electronics</h4>
          <p>Computer Science, Higher education, Master's degree</p>
          <p>2024 - 2025, Kharkiv</p>
        </div>

        <div className='education-item'>
          <h4>Kharkiv National University of Radio Electronics</h4>
          <p>Computer Science, Higher education, Bachelor</p>
          <p>2020 - 2024, Kharkiv</p>
        </div>

        <div className='education-item'>
          <h4>Hilell</h4>
          <p>Front end Pro course</p>
          <p>
            <a href='https://certificate.ithillel.ua/view/77686741'>
              https://certificate.ithillel.ua/view/77686741
            </a>
          </p>
          <p>2022 - 2023, Kharkiv</p>
        </div>

        <div className='education-item'>
          <h4>Lemon-School Studio</h4>
          <p>Front-End course (HTML/CSS + JS)</p>
          <p>2022 - 2022, Kharkiv</p>
        </div>

        <div className='education-item'>
          <h4>Kharkiv comprehensive school of grades I-III #151</h4>
          <p>Secondary education</p>
          <p>2009 - 2020, Kharkiv</p>
        </div>
      </section>
    </div>
  );
};

export default CV;
