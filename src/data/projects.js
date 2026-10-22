import ignittonImg from "../assets/igniton.png";
import dnaAlignImg from "../assets/dnaalign.png";
import osLowImg from "../assets/os-low.png";
import incandescentImg from "../assets/incandescent.png";
import drawbee from "../assets/drawbee.png";
import divinityImg from "../assets/divinity.png";



export const projects = [
  {
    id: "01",
    name: "Ignition",
    tag: "Passion Project",
    desc: "An interactive automotive experience inspired by Need for Speed, combining racing aesthetics with 3D visuals and motion.",
    stack: ["Three.js", "GSAP", "React"],
    image: ignittonImg,
    link: "https://ignitioncars.vercel.app",
  },

  {
    id: "02",
    name: "DrawBee",
    tag: "White Board",
    desc: "A real-time collaborative drawing app with a focus on creativity and ease of use.",
    stack: ["Konva.js", "React", "Supabase", "PostgreSQL"],
    image: drawbee,
    link: "https://github.com/Mrfaheem4/DrawBee",
  },
  {
    id: "03",
    name: "Divinity",
    tag: "Desktop Browser",
    desc: "A custom Electron-based desktop web browser with a native multi-tab engine, real-time IPC-driven state synchronization, and a 3D landing experience rendered with Three.js.",
    stack: ["Electron", "React", "TypeScript", "Three.js"],
    image: divinityImg,
    link: "https://github.com/Mrfaheem4/Divinity",
  },
  {
    id: "04",
    name: "DNA Align",
    tag: "Bioinformatics",
    desc: "Compare and align DNA sequences with an intuitive interface. Built for researchers and bioinformatics enthusiasts.",
    stack: ["React", "Tailwind"],
    image: dnaAlignImg,
    link: "https://dnaalign.vercel.app",
  },
  {
    id: "05",
    name: "OS Kernel Simulator",
    tag: "Systems Programming",
    desc: "Simulate OS kernel operations including process thread management, synchronization, scheduling, and memory management. Learn how operating systems work.",
    stack: ["React", "Tailwind", "JavaScript"],
    image: osLowImg,
    link: "https://os-low.vercel.app",
  },
  {
    id: "06",
    name: "Incandescent",
    tag: "World Clock",
    desc: "A beautiful world clock application that uses a time API to display current time across all 24 hour regions. Perfect for coordinating across timezones.",
    stack: ["React", "API", "Tailwind"],
    image: incandescentImg,
    link: "https://incandescent-mu.vercel.app",
  },
  {
    id: "07",
    name: "Synesthesia",
    tag: "Creative Dev",
    desc: "Music visualized through shapes and colors. Feed it a track, watch it think in gradients and geometry.",
    stack: ["React", "TypeScript", "Three.js"],
    link: "https://github.com/Mrfaheem4/Synesthesia",
  },
];


