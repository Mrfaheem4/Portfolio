import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const heroWrapRef = useRef(null);

  useEffect(() => {
    const init = setTimeout(() => {
      const hero = heroWrapRef.current;
      if (!hero) return;

      const heroPinTL = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onLeave: () => ScrollTrigger.refresh(),
        },
      });

      heroPinTL.to(hero, { opacity: 1, duration: 0.6 });
      heroPinTL.to(hero, {
        yPercent: -105,
        duration: 0.4,
        ease: "power2.in",
      });

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
        <About />
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
