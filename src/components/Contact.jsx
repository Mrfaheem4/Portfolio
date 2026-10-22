export default function Contact() {
  return (
    <section
      id="contact"
      className="contact-section section"
      aria-labelledby="contact-title"
    >
      <div className="container">
        <p className="eyebrow section-label">04 / Start a conversation</p>
        <div className="contact-heading">
          <h2 id="contact-title">
            Have something
            <br />
            <span className="serif">in mind?</span>
          </h2>
          <a
            className="contact-arrow"
            href="mailto:mrfaheem010@gmail.com"
            aria-label="Email Faheem about your idea"
          >
            ↗
          </a>
        </div>
        <div className="contact-bottom">
          <p>
            A project, a collaboration, or just a hello.
            <br />
            I’d love to hear what you’re thinking.
          </p>
          <a className="contact-email" href="mailto:mrfaheem010@gmail.com">
            mrfaheem010@gmail.com <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
