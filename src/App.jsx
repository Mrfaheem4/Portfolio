import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import signatureSvg from "./assets/signature.svg";
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

      // Disable smooth scroll behavior during animation
      document.documentElement.style.scrollBehavior = "auto";

      const heroPinTL = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "+=75%",
          pin: true,
          scrub: 0.8,
          anticipatePin: 0,
          invalidateOnRefresh: true,
          onRefresh: () => {
            // Additional refresh handling
          },
        },
      });

      heroPinTL.to(hero, { opacity: 1, duration: 0.4 });
      heroPinTL.to(hero, {
        yPercent: -100,
        duration: 0.3,
        ease: "power2.in",
      });

      ScrollTrigger.refresh();

      // Restore smooth scroll after initialization
      document.documentElement.style.scrollBehavior = "smooth";
    }, 1300);

    return () => {
      clearTimeout(init);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="bg-gray-100 overflow-x-hidden">
      <Cursor />
      <Nav />

      {/* Hero wrapper — gets pinned */}
      <div ref={heroWrapRef} className="relative z-10">
        <Hero />
      </div>

      {/* Signature between Hero and About */}
      <div
        className="relative z-20 flex justify-center pointer-events-none"
        style={{ paddingTop: "0.5rem", paddingBottom: "2rem" }}
      >
        <img
          src={signatureSvg}
          alt="signature"
          style={{
            height: "400px",
            width: "auto",
            filter:
              "drop-shadow(0 0 0px #d4843a) brightness(0%) sepia(100%) hue-rotate(30deg) saturate(2)",
          }}
        />
      </div>

      {/* Everything below scrolls normally after hero unpins */}
      <div className="relative z-20">
        <About />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}

export default App;
