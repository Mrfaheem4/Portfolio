import { useState, useEffect } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full ${
        scrolled
          ? "bg-charcoal/80 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex-1">
          <a href="#" className="font-script text-2xl text-golden">
            Faheem.
          </a>
        </div>

        {/* Center: Links */}
        <div className="hidden md:flex items-center gap-10">
          {["Home", "Work", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-cream/50 hover:text-cream text-xs tracking-[0.2em] uppercase transition-colors duration-300 font-display"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Right: Hire Me */}
        <div className="flex-1 flex justify-end">
          <a
            href="#contact"
            className="px-6 py-2.5 text-golden text-xs tracking-[0.2em] uppercase hover:text-golden/80 transition-all duration-300 font-display"
          >
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  );
}
