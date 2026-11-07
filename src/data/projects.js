import ignittonImg from "../assets/optimized/igniton-1280.webp";
import dnaAlignImg from "../assets/optimized/dnaalign-1280.webp";
import osLowImg from "../assets/optimized/os-low-1280.webp";
import incandescentImg from "../assets/optimized/incandescent-1280.webp";
import drawbee from "../assets/optimized/drawbee-1280.webp";
import divinityImg from "../assets/optimized/divinity-1280.webp";
import ignittonSmall from "../assets/optimized/igniton-640.webp";
import dnaAlignSmall from "../assets/optimized/dnaalign-640.webp";
import osLowSmall from "../assets/optimized/os-low-640.webp";
import incandescentSmall from "../assets/optimized/incandescent-640.webp";
import drawbeeSmall from "../assets/optimized/drawbee-640.webp";
import divinitySmall from "../assets/optimized/divinity-640.webp";



export const projects = [
  {
    id: "01",
    name: "Ignition",
    tag: "Passion Project",
    desc: "An interactive automotive experience inspired by Need for Speed, combining racing aesthetics with 3D visuals and motion.",
    stack: ["Three.js", "GSAP", "React"],
    image: ignittonImg,
    imageSmall: ignittonSmall,
    imageHeight: 607,
    link: "https://ignitioncars.vercel.app",
  },

  {
    id: "02",
    name: "DrawBee",
    tag: "White Board",
    desc: "A real-time collaborative drawing app with a focus on creativity and ease of use.",
    stack: ["Konva.js", "React", "Supabase", "PostgreSQL"],
    image: drawbee,
    imageSmall: drawbeeSmall,
    imageHeight: 608,
    link: "https://github.com/Mrfaheem4/DrawBee",
  },
  {
    id: "03",
    name: "Divinity",
    tag: "Desktop Browser",
    desc: "A custom Electron-based desktop web browser with a native multi-tab engine, real-time IPC-driven state synchronization, and a 3D landing experience rendered with Three.js.",
    stack: ["Electron", "React", "TypeScript", "Three.js"],
    image: divinityImg,
    imageSmall: divinitySmall,
    imageHeight: 680,
    link: "https://github.com/Mrfaheem4/Divinity",
  },
  {
    id: "04",
    name: "DNA Align",
    tag: "Bioinformatics",
    desc: "Compare and align DNA sequences with an intuitive interface. Built for researchers and bioinformatics enthusiasts.",
    stack: ["React", "Tailwind"],
    image: dnaAlignImg,
    imageSmall: dnaAlignSmall,
    imageHeight: 675,
    link: "https://dnaalign.vercel.app",
  },
  {
    id: "05",
    name: "OS Kernel Simulator",
    tag: "Systems Programming",
    desc: "Simulate OS kernel operations including process thread management, synchronization, scheduling, and memory management. Learn how operating systems work.",
    stack: ["React", "Tailwind", "JavaScript"],
    image: osLowImg,
    imageSmall: osLowSmall,
    imageHeight: 606,
    link: "https://os-low.vercel.app",
  },
  {
    id: "06",
    name: "Incandescent",
    tag: "World Clock",
    desc: "A beautiful world clock application that uses a time API to display current time across all 24 hour regions. Perfect for coordinating across timezones.",
    stack: ["React", "API", "Tailwind"],
    image: incandescentImg,
    imageSmall: incandescentSmall,
    imageHeight: 600,
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


