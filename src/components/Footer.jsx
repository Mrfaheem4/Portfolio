export default function Footer() {
  return (
    <footer className="border-t border-cream/10 px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <span className="font-script text-xl text-golden">Faheem.</span>
      <p className="text-cream/30 text-xs font-display tracking-widest">
        © 2025 Faheem Ahmed · Built with React & Tailwind
      </p>
      <div className="flex items-center gap-6">
        {["GitHub", "LinkedIn", "Twitter"].map((s) => (
          <a
            key={s}
            href="#"
            className="text-cream/30 hover:text-golden text-xs font-display tracking-widest uppercase transition-colors duration-300"
          >
            {s}
          </a>
        ))}
      </div>
    </footer>
  );
}
