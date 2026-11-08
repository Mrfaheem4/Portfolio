export default function Experience() {
  return (
    <section
      id="experience"
      className="section experience-section"
      aria-labelledby="experience-title"
    >
      <div className="container">
        <h2 id="experience-title">Work experience.</h2>
        <article
          className="experience-card experience-grid"
          aria-labelledby="internship-title"
        >
          <div className="experience-company">
            <img
              className="experience-logo"
              src={`${import.meta.env.BASE_URL}zemt%20logo.jpeg`}
              alt="ZEMT Innovations logo"
              width="240"
              height="240"
              loading="lazy"
              decoding="async"
            />
            <div>
              <p className="experience-company-name">ZEMT Innovations</p>
              <p className="experience-location">SEECS, NUST</p>
            </div>
          </div>
          <div className="experience-details">
            <span className="experience-type">Internship</span>
            <div className="experience-role">
              <h3 id="internship-title">Full-Stack Developer</h3>
              <p className="experience-dates">
                <time dateTime="2026-06-05">5 Jun</time>
                <span> to </span>
                <time dateTime="2026-07-30">30 Jul 2026</time>
              </p>
            </div>
            <p className="experience-project">
              Urban Guard, accident detection & response
            </p>
            <ul className="experience-outcomes">
              <li>
                Connected five live camera feeds to the Urban Guard dashboard.
              </li>
              <li>
                Built five-frame YOLOv8 confirmation to reduce false alerts and
                save incident evidence.
              </li>
              <li>
                Delivered live incident updates and simulated emergency alerts
                with acknowledgment tracking.
              </li>
            </ul>
          </div>
        </article>
      </div>
    </section>
  );
}
