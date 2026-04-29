import { useRef, useEffect, useState } from "react";
import faheemPhoto from "../assets/faheem.jpg";

export default function Contact() {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.1 },
    );
    sectionRef.current
      ?.querySelectorAll(".reveal")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 px-10 overflow-hidden"
    >
      {/* Ghost text */}
      <div className="absolute top-16 inset-x-0 flex justify-center pointer-events-none select-none">
        <span
          className="text-outline font-display font-black"
          style={{ fontSize: "clamp(80px, 16vw, 200px)" }}
        >
          CONTACT
        </span>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Card */}
        <div className="rounded-3xl overflow-hidden grid md:grid-cols-[2fr_3fr] bg-cream/5 border border-cream/10 reveal">
          {/* Left — photo */}
          <div className="relative min-h-80 md:min-h-0">
            <img
              src={faheemPhoto}
              alt="Faheem Ahmed"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
            {/* Golden overlay tint */}
            <div
              className="absolute inset-0 mix-blend-color"
              style={{
                background: "linear-gradient(135deg, #d4843a22, transparent)",
              }}
            />
          </div>

          {/* Right — form */}
          <div className="p-10 md:p-14 bg-cream text-charcoal">
            <h2
              className="font-display font-black text-charcoal mb-8"
              style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
            >
              LET'S BUILD
              <br />
              <span style={{ color: "#d4843a" }}>SOMETHING PRETTY.</span>
            </h2>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-charcoal/50 text-xs font-display tracking-widest uppercase block mb-2">
                    Full Name *
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name here"
                    className="w-full border-b border-charcoal/20 bg-transparent pb-2 text-sm font-sans text-charcoal placeholder-charcoal/30 outline-none focus:border-golden transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="text-charcoal/50 text-xs font-display tracking-widest uppercase block mb-2">
                    Email *
                  </label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className="w-full border-b border-charcoal/20 bg-transparent pb-2 text-sm font-sans text-charcoal placeholder-charcoal/30 outline-none focus:border-golden transition-colors duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="text-charcoal/50 text-xs font-display tracking-widest uppercase block mb-2">
                  Subject *
                </label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Write subject line"
                  className="w-full border-b border-charcoal/20 bg-transparent pb-2 text-sm font-sans text-charcoal placeholder-charcoal/30 outline-none focus:border-golden transition-colors duration-300"
                />
              </div>

              <div>
                <label className="text-charcoal/50 text-xs font-display tracking-widest uppercase block mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={4}
                  className="w-full border-b border-charcoal/20 bg-transparent pb-2 text-sm font-sans text-charcoal placeholder-charcoal/30 outline-none focus:border-golden transition-colors duration-300 resize-none"
                />
              </div>

              <button className="mt-2 px-8 py-4 rounded-full bg-charcoal text-cream font-display font-bold tracking-widest uppercase text-sm hover:bg-golden hover:text-charcoal transition-all duration-300">
                Send Message →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
