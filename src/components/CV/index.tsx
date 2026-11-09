import { CV as data } from "@/src/data/cv";
import { CV_PDF_PATH } from "@/src/data/contacts";
import "./style.scss";

const CV = () => {
  return (
    <div className='cv-container'>
      <div className='cv-header'>
        <div>
          <h1>{data.name}</h1>
          <h2>{data.role}</h2>
          <p className='cv-location'>{data.location}</p>
        </div>
        <a className='cv-download' href={CV_PDF_PATH} target='_blank' rel='noopener noreferrer' download>
          <i className='ri-file-download-line' aria-hidden='true'></i>
          _download-cv.pdf
        </a>
      </div>

      <section className='about-me' id='about-me'>
        <h3>Summary</h3>
        <p>{data.summary}</p>
      </section>

      <section className='skills' id='skills'>
        <h3>Skills</h3>
        <dl className='skills-list'>
          {data.skills.map((skill) => (
            <div className='skills-row' key={skill.group}>
              <dt>{skill.group}</dt>
              <dd>{skill.items}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className='experience' id='experience'>
        <h3>Experience</h3>
        {data.experience.map((job) => (
          <div className='job' key={`${job.company}-${job.period}`}>
            <h4>
              {job.title} ·{" "}
              {job.url ? (
                <a href={job.url} target='_blank' rel='noopener noreferrer'>
                  {job.company}
                </a>
              ) : (
                <span className='company'>{job.company}</span>
              )}
            </h4>
            <p className='job-meta'>
              {job.period}
              {job.details && ` · ${job.details}`}
            </p>
            <ul>
              {job.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            {job.stack && (
              <p className='job-stack'>
                <span>Stack:</span> {job.stack}
              </p>
            )}
          </div>
        ))}
      </section>

      <section className='education' id='education'>
        <h3>Education</h3>
        {data.education.map((item) => (
          <div className='education-item' key={item.title}>
            <h4>{item.title}</h4>
            <p>
              {item.place} · {item.period}
              {item.link && (
                <>
                  {" · "}
                  <a href={item.link.href} target='_blank' rel='noopener noreferrer'>
                    {item.link.label}
                  </a>
                </>
              )}
            </p>
          </div>
        ))}
      </section>

      <section className='languages' id='languages'>
        <h3>Languages</h3>
        <ul className='languages-list'>
          {data.languages.map((language) => (
            <li key={language.name}>
              <span className='language-name'>{language.name}</span> · {language.level}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default CV;
