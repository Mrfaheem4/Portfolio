import ignittonImg from "../assets/optimized/igniton-1280.webp";
import dnaAlignImg from "../assets/optimized/dnaalign-1280.webp";
import drawbee from "../assets/optimized/drawbee-1280.webp";
import divinityImg from "../assets/optimized/divinity-1280.webp";
import incandescentImg from "../assets/optimized/incandescent-1280.webp";
import ignittonSmall from "../assets/optimized/igniton-640.webp";
import dnaAlignSmall from "../assets/optimized/dnaalign-640.webp";
import drawbeeSmall from "../assets/optimized/drawbee-640.webp";
import divinitySmall from "../assets/optimized/divinity-640.webp";
import incandescentSmall from "../assets/optimized/incandescent-640.webp";



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
    name: "Ventus",
    tag: "Browser-based Wind Tunnel",
    status: "Ongoing",
    desc: "Exploring airflow in the browser with a GPU-powered 3D fluid simulation. Currently developing the solver and sphere-flow visualization, with custom model support planned.",
    stack: ["WebGPU", "Three.js", "React", "TypeScript"],
    artwork: "airflow",
    link: "https://github.com/Mrfaheem4/Ventus",
  },
  {
    id: "04",
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
    id: "05",
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
    id: "06",
    name: "TD-Replica",
    tag: "Creative Coding",
    desc: "An interactive experiment that turns webcam-tracked hand movements into real-time, shader-driven visuals.",
    stack: ["React", "TypeScript", "WebGL", "GLSL"],
    artwork: "gestures",
    link: "https://github.com/Mrfaheem4/TD-Replica",
  },
  {
    id: "07",
    name: "Incandescent",
    tag: "World Clock · My first project",
    desc: "A world clock for exploring the time across different time zones. The project that started my journey into building for the web.",
    stack: ["React", "API", "Tailwind"],
    image: incandescentImg,
    imageSmall: incandescentSmall,
    imageHeight: 600,
    link: "https://incandescent-mu.vercel.app",
  },
];


