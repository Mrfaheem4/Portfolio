import ArrowIcon from "./ArrowIcon";
import { useId } from "react";
import useContactReveal from "../lib/useContactReveal";

function ContactDetails() {
  return (
    <>
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
    </>
  );
}

export default function Contact() {
  const sectionRef = useContactReveal();
  const maskId = useId();
  return (
    <section
      ref={sectionRef}
      id="contact"
      className="contact-section section"
      aria-labelledby="contact-title"
    >
      <div className="container">
        <div className="contact-heading">
          <h2 id="contact-title">
            <span className="contact-title-line">
              <span>Have something</span>
            </span>{" "}
            <span className="contact-title-line">
              <span>in mind?</span>
            </span>
            <svg
              className="contact-underline"
              viewBox="0 0 420 28"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 20C100 4 260 3 414 13M50 26C158 14 285 13 365 18"
                pathLength="1"
              />
            </svg>
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
        <div className="contact-bottom-wrap">
          <svg
            className="contact-mask-defs"
            width="0"
            height="0"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <mask
                id={maskId}
                maskUnits="userSpaceOnUse"
                maskContentUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="1"
                height="1"
                style={{ maskType: "alpha" }}
              >
                <path
                  className="contact-ribbon-mask-path"
                  fill="none"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </mask>
            </defs>
          </svg>
          <div className="contact-bottom">
            <ContactDetails />
          </div>
          <div
            className="contact-bottom contact-bottom-inverted"
            style={{ maskImage: `url("#${maskId}")` }}
            aria-hidden="true"
            inert
          >
            <ContactDetails />
          </div>
        </div>
      </div>
    </section>
  );
}
