export default function Footer() {
  return (
    <footer className="site-footer"><div className="container footer-inner">
      <a className="wordmark" href="#home" aria-label="Faheem Ahmed, back to top">faheem<span aria-hidden="true">.</span></a>
      <p>© {new Date().getFullYear()} Faheem Ahmed</p>
      <div className="footer-links"><a href="https://github.com/Mrfaheem4" target="_blank" rel="noopener noreferrer">GitHub ↗<span className="sr-only"> (opens in a new tab)</span></a><a href="#home">Back to top ↑</a></div>
    </div></footer>
  );
}
