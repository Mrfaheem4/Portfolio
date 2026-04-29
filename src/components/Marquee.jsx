export default function Marquee() {
  const items = [
    "REACT JS",
    "THREE.JS",
    "GSAP",
    "TYPESCRIPT",
    "MUI",
    "UI/UX",
    "FRONT END",
    "WEB DESIGN",
  ];
  const doubled = [...items, ...items];

  return (
    <div className="relative py-5 overflow-hidden border-y border-golden/20 bg-charcoal">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 mx-6">
            <span className="text-golden font-display font-bold tracking-[0.25em] text-sm uppercase">
              {item}
            </span>
            <span className="text-golden/30 text-lg">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
