import portrait from "../assets/faheem.jpg";
import signature from "../assets/signature.svg";
import ArrowIcon from "./ArrowIcon";

export default function Hero() {
  return (
    <section id="home" className="hero container" aria-labelledby="hero-title">
      <div className="intro-copy">
        <h1 id="hero-title">
          Thoughtful code.
          <br />
          Distinctive experiences.
        </h1>
        <p className="hero-intro">
          I’m Faheem Ahmed, a software engineer building expressive digital experiences.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#work">
            Explore my work <ArrowIcon />
          </a>
          <a
            className="text-link"
            href="https://mail.google.com/mail/?view=cm&to=mrfaheem010@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Let’s talk
          </a>
        </div>
      </div>
      <div className="portrait-composition">
        <div className="portrait-frame">
          <img src={portrait} alt="Faheem Ahmed" fetchPriority="high" />
        </div>
        <img className="portrait-signature" src={signature} alt="" aria-hidden="true" />
        <div className="portrait-caption">
          <div>
            <strong>Faheem Ahmed</strong>
            <span>Software engineer & creative developer</span>
          </div>
          <span className="portrait-mark" aria-hidden="true"><ArrowIcon /></span>
        </div>
      </div>
      <div className="hero-bottom">
        <span>Software Engineering, NUST</span>
        <span>Code with purpose. Design with personality.</span>
        <a href="#work" aria-label="Discover selected projects"><ArrowIcon down /></a>
      </div>
    </section>
  );
}
