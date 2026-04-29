import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const heroWrapRef = useRef(null);
  const marqueeRef = useRef(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    // Set these IMMEDIATELY — before any scroll happens
    if (marqueeRef.current)
      gsap.set(marqueeRef.current, { y: "60px", opacity: 0 });
    if (aboutRef.current) gsap.set(aboutRef.current, { y: "80px", opacity: 0 });

    const init = setTimeout(() => {
      const hero = heroWrapRef.current;
      const marquee = marqueeRef.current;
      const about = aboutRef.current;
      if (!hero || !marquee || !about) return;

      // Pin + exit timeline
      const heroPinTL = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onLeave: () => {
            // Hero fully gone — now animate marquee in
            gsap.to(marquee, {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power3.out",
            });
          },
          onLeaveBack: () => {
            // User scrolled back up — hide marquee again
            gsap.to(marquee, {
              y: "60px",
              opacity: 0,
              duration: 0.4,
              ease: "power2.in",
            });
          },
        },
      });

      heroPinTL.to(hero, { opacity: 1, duration: 0.6 });
      heroPinTL.to(hero, {
        yPercent: -105,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      });

      // About enters via scroll position — not onLeave
      ScrollTrigger.create({
        trigger: about,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(about, {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power4.out",
          });
        },
      });

      // Force ScrollTrigger to recalculate all positions
      ScrollTrigger.refresh();
    }, 1300);

    return () => clearTimeout(init);
  }, []);
  return (
    <main className="bg-charcoal overflow-x-hidden">
      <Cursor />
      <Nav />

      {/* Hero wrapper — gets pinned */}
      <div ref={heroWrapRef} className="relative z-10">
        <Hero />
      </div>

      {/* Everything below scrolls normally after hero unpins */}
      <div className="relative z-20">
        <div ref={marqueeRef}>
          <Marquee />
        </div>

        <div className="mb-20" />

        <div ref={aboutRef}>
          <About /> {/* ScrollFloat inside here works automatically */}
        </div>

        <div className="mb-20" />
        <Projects />
        <div className="mb-20" />
        <Skills />
        <div className="mb-20" />
        <Contact />
        <div className="mb-20" />
        <Footer />
      </div>
    </main>
  );
}

export default App;
