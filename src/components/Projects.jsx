import { projects } from "../data/projects";
import ArrowIcon from "./ArrowIcon";

export default function Projects() {
  return (
    <section id="work" className="section work-section" aria-labelledby="work-title">
      <div className="container">
        <div className="section-heading">
          <div><h2 id="work-title">Selected work.</h2></div>
          <p>A selection of experiments, useful tools,<br className="desktop-break" /> and ideas brought to life.</p>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.id}>
              <a className={`project-preview${!project.image ? " project-preview-art" : ""}`} href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`Explore ${project.name} (opens in a new tab)`}>
                {project.image ? <img src={project.image} alt={`${project.name} application preview`} loading="lazy" decoding="async" width="800" height="600" /> : <div className="synesthesia-art" aria-hidden="true"><span className="art-title">Synesthesia<span>Sound, in a different light.</span></span></div>}
                <span className="preview-arrow" aria-hidden="true"><ArrowIcon /></span>
              </a>
              <div className="project-info">
              <div className="project-meta"><h3><a href={project.link} target="_blank" rel="noopener noreferrer">{project.name}<span className="sr-only"> (opens in a new tab)</span></a></h3></div>
              <p className="project-category">{project.tag}</p>
              <p className="project-description">{project.desc}</p>
              <ul className="project-stack" aria-label={`${project.name} technologies`}>{project.stack.map((tech) => <li key={tech}>{tech}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
        <div className="work-footnote"><span>Always curious. Always building.</span><a className="text-link" href="https://github.com/Mrfaheem4" target="_blank" rel="noopener noreferrer">Explore my GitHub<span className="sr-only"> (opens in a new tab)</span></a></div>
      </div>
    </section>
  );
}
