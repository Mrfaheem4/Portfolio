import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import contactImg from "../assets/contact.jpeg";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const ghostRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ghost fade in + scroll parallax
      gsap.fromTo(
        ghostRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: -60,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            end: "bottom top",
            scrub: 2,
          },
        },
      );

      // Form entrance
      gsap.fromTo(
        formRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 75%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full flex flex-col items-center"
      style={{ paddingTop: "12rem", paddingBottom: "12rem" }}
    >
      {/* CENTERED CONTAINER */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-10 flex flex-col items-center">
        {/* TOP HEADER */}
        <div className="w-full text-center">
          <p className="text-golden text-xs tracking-[0.3em] uppercase font-display mb-4">
            Get In Touch
          </p>
          <h2
            className="font-display font-black text-cream"
            style={{ fontSize: "clamp(32px, 5vw, 60px)" }}
          >
            Let's Build Something
          </h2>
        </div>

        {/* GHOST TEXT */}
        <div
          ref={ghostRef}
          className="relative w-full flex items-center justify-center pointer-events-none select-none overflow-hidden"
          style={{
            height: "28rem",
            marginTop: "-2rem",
            marginBottom: "-4rem",
            opacity: 0,
          }}
        >
          <span
            className="font-display font-black whitespace-nowrap bg-gradient-to-b from-gray-400 to-black bg-clip-text text-transparent"
            style={{
              fontSize: "clamp(80px, 16vw, 200px)",
              letterSpacing: "-0.02em",
            }}
          >
            CONTACT
          </span>
        </div>

        {/* CONTACT CARD */}
        <div
          ref={formRef}
          className="w-full rounded-3xl overflow-hidden grid md:grid-cols-2 gap-0 bg-cream/5 border border-cream/10 min-h-[500px]"
          style={{ opacity: 0, transform: "translateY(60px)" }}
        >
          {/* Left — image */}
          <div className="relative hidden md:block">
            <img
              src={contactImg}
              alt="Contact"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
          </div>

          {/* Right — contact info */}
          <div className="p-12 md:p-20 bg-cream text-charcoal flex flex-col justify-center">
            <h2
              className="font-display font-black text-charcoal mb-16"
              style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
            >
              LET'S BUILD
              <br />
              <span style={{ color: "#d4843a" }}>SOMETHING PRETTY.</span>
            </h2>

            <div className="space-y-8">
              {/* Email Tile */}
              <a
                href="mailto:mrfaheem010@gmail.com"
                className="flex items-center gap-4 p-6 rounded-2xl bg-charcoal/10 border border-charcoal/20 hover:bg-charcoal/15 hover:border-golden/50 transition-all duration-300"
              >
                <div className="text-2xl">✉️</div>
                <div>
                  <p className="text-xs font-display tracking-widest uppercase text-charcoal/50 mb-1">
                    Email
                  </p>
                  <p className="text-lg font-display font-bold text-charcoal">
                    mrfaheem010@gmail.com
                  </p>
                </div>
              </a>

              {/* GitHub Tile */}
              <a
                href="https://github.com/Mrfaheem4"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 rounded-2xl bg-charcoal/10 border border-charcoal/20 hover:bg-charcoal/15 hover:border-golden/50 transition-all duration-300"
              >
                <svg
                  className="w-8 h-8 text-charcoal"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <div>
                  <p className="text-xs font-display tracking-widest uppercase text-charcoal/50 mb-1">
                    GitHub
                  </p>
                  <p className="text-lg font-display font-bold text-charcoal">
                    github.com/Mrfaheem4
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
