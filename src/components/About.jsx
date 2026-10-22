import signature from "../assets/signature.svg";

export default function About() {
  return (
    <section
      id="about"
      className="about-section section"
      aria-labelledby="about-title"
    >
      <div className="container about-grid">
        <div>
          <p className="eyebrow section-label">02 / A little about me</p>
          <h2 id="about-title">
            An engineer’s mind.
            <br />
            <span className="serif">A designer’s eye.</span>
          </h2>
        </div>
        <div className="about-copy">
          <p className="about-lead">
            I like making complex things feel simple and simple things feel
            considered.
          </p>
          <p>
            I’m studying Software Engineering at NUST, exploring the space
            between solid engineering and expressive design. My work spans
            interactive websites, collaborative tools, and desktop applications.
          </p>
          <p>
            Whether it’s a subtle interaction or the structure behind an app, I
            care about the details that make an experience feel right.
          </p>
          <div className="about-signoff">
            <img
              src={signature}
              alt="Faheem’s signature"
              loading="lazy"
              width="150"
              height="68"
            />
            <a
              className="text-link"
              href="https://github.com/Mrfaheem4"
              target="_blank"
              rel="noopener noreferrer"
            >
              More on GitHub <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
