import portrait from "../assets/faheem.jpg";

export default function Hero() {
  return (
    <section id="home" className="hero container" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="status-dot" aria-hidden="true" />
          Software engineer & creative developer
        </p>
        <h1 id="hero-title">
          Thoughtful code.
          <br />
          <span className="serif">Distinctive</span>
          <br />
          experiences<span className="accent">.</span>
        </h1>
        <p className="hero-intro">
          I’m Faheem Ahmed. I turn ideas into expressive, intuitive digital
          experiences — with a little curiosity and a lot of attention to
          detail.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#work">
            Explore my work <span aria-hidden="true">↗</span>
          </a>
          <a
            className="text-link"
            href="https://mail.google.com/mail/?view=cm&to=mrfaheem010@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Let’s talk <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="hero-note">
          <span className="note-line" aria-hidden="true" />
          Currently studying Software Engineering at NUST
        </div>
      </div>
      <div className="portrait-composition">
        <div className="portrait-topline">
          <span>A little craft. A lot of care.</span>
          <span aria-hidden="true">✳</span>
        </div>
        <div className="portrait-frame">
          <img src={portrait} alt="Faheem Ahmed" fetchPriority="high" />
        </div>
        <div className="portrait-caption">
          <div>
            <strong>Faheem Ahmed</strong>
            <span>Building for the web & beyond</span>
          </div>
          <span className="portrait-mark" aria-hidden="true">
            ↗
          </span>
        </div>
        <span className="portrait-label" aria-hidden="true">
          Design-minded. Detail-driven.
        </span>
      </div>
      <div className="hero-bottom">
        <span>CODE WITH PURPOSE. DESIGN WITH PERSONALITY.</span>
        <a href="#work">
          Scroll to discover <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
