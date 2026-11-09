import { useRef } from "react";
import StaggeredMenu from "./StaggeredMenu";
import useNavInk from "../lib/useNavInk";
import "./Nav.css";

const items = [
  ["Home", "home"], ["Work", "work"], ["Experience", "experience"],
  ["About", "about"], ["Stack", "skills"], ["Contact", "contact"],
].map(([label, id]) => ({ label, ariaLabel: `Go to ${label}`, link: `#${id}` }));

// Blue and black lead into the white menu panel.
const colors = ["#245bff", "#000000"];
const notifyOpen = () => window.dispatchEvent(new CustomEvent("portfolio:menu", { detail: true }));
const notifyClose = () => window.dispatchEvent(new CustomEvent("portfolio:menu", { detail: false }));

export default function Nav() {
  const surfaceRef = useRef(null);
  useNavInk(surfaceRef);

  return (
    <>
      <div className="navigation-space" aria-hidden="true" />
      <StaggeredMenu
        className="portfolio-menu"
        position="right"
        items={items}
        colors={colors}
        headerBackground={
          <div ref={surfaceRef} className="nav-surface" aria-hidden="true">
            <div className="nav-ink"><span /><span /><span /></div>
          </div>
        }
        logo={<span className="wordmark">faheem<span aria-hidden="true">.</span></span>}
        menuButtonColor="#0b0b0b"
        openMenuButtonColor="#0b0b0b"
        accentColor="#000000"
        displaySocials={false}
        displayItemNumbering={false}
        isFixed
        onMenuOpen={notifyOpen}
        onMenuClose={notifyClose}
      />
    </>
  );
}
