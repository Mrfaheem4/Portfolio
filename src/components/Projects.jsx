import { projects } from "../data/projects";

export default function Projects() {
  return (
    <section id="work" className="section work-section" aria-labelledby="work-title">
      <div className="container">
        <div className="section-heading">
          <div><p className="eyebrow section-label">01 / Selected work</p><h2 id="work-title">Built with intent.<br /><span className="serif">Made to be explored.</span></h2></div>
          <p>A selection of experiments, useful tools,<br className="desktop-break" /> and ideas brought to life.</p>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.id}>
              <a className={`project-preview${!project.image ? " project-preview-art" : ""}`} href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`Explore ${project.name} (opens in a new tab)`}>
                {project.image ? <img src={project.image} alt={`${project.name} application preview`} loading="lazy" decoding="async" width="800" height="600" /> : <div className="synesthesia-art" aria-hidden="true"><span className="art-orbit" /><span className="art-orbit orbit-two" /><span className="art-title">Synesthesia<span>Sound, in a different light.</span></span></div>}
                <span className="preview-tag">{project.tag}</span>
                <span className="preview-arrow" aria-hidden="true">↗</span>
              </a>
              <div className="project-meta"><span className="project-index">/{project.id}</span><h3><a href={project.link} target="_blank" rel="noopener noreferrer">{project.name}<span className="sr-only"> (opens in a new tab)</span></a></h3></div>
              <p className="project-description">{project.desc}</p>
              <ul className="project-stack" aria-label={`${project.name} technologies`}>{project.stack.map((tech) => <li key={tech}>{tech}</li>)}</ul>
            </article>
          ))}
        </div>
        <div className="work-footnote"><span>Always curious. Always building.</span><a className="text-link" href="https://github.com/Mrfaheem4" target="_blank" rel="noopener noreferrer">Explore my GitHub <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a></div>
      </div>
    </section>
  );
}
