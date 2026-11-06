import ArrowIcon from "./ArrowIcon";

export default function Contact() {
  return (
    <section
      id="contact"
      className="contact-section section"
      aria-labelledby="contact-title"
    >
      <div className="container">
        <div className="contact-heading">
          <h2 id="contact-title">
            Have something
            <br />
            in mind?
          </h2>
          <a
            className="contact-arrow"
            href="https://mail.google.com/mail/?view=cm&to=mrfaheem010@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email Faheem about your idea"
          >
            <ArrowIcon />
          </a>
        </div>
        <div className="contact-bottom">
          <p>
            A project, a collaboration, or just a hello.
            <br />
            I’d love to hear what you’re thinking.
          </p>
          <a
            className="contact-email"
            href="https://mail.google.com/mail/?view=cm&to=mrfaheem010@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            mrfaheem010@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
