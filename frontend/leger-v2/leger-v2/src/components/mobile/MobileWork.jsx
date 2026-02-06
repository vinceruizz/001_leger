import { useState, useEffect } from "react";

function MobileWork() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("https://api.vinceruiz.com/project", {
          method: "GET",
          headers: {
            "X-API-KEY": "+A7V2!CX*jT?^]n",
            "Content-Type": "application/json"
          }
        });
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        const sorted = Array.isArray(data)
          ? data.sort((a, b) => a.working_name.localeCompare(b.working_name))
          : [];
        setProjects(sorted);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="mobile-work">
        <div className="mobile-work__loading">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="mobile-work">
      {projects.map((project) => (
        <button
          key={project.id}
          className="mobile-work__card"
          onClick={() => setSelectedProject(project)}
        >
          {project.img_url && (
            <img
              src={project.img_url}
              alt={project.title}
              className="mobile-work__image"
            />
          )}
          <div className="mobile-work__info">
            <h3>{project.title}</h3>
            <p>{project.preview_description}</p>
          </div>
        </button>
      ))}

      {selectedProject && (
        <div
          className="mobile-work__modal-overlay"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="mobile-work__modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedProject.title}</h2>
            <p className="mobile-work__working-name">
              {selectedProject.working_name}
            </p>
            {selectedProject.img_url && (
              <img
                src={selectedProject.img_url}
                alt={selectedProject.title}
                className="mobile-work__modal-image"
              />
            )}
            <p className="mobile-work__description">
              {selectedProject.full_description}
            </p>
            {selectedProject.github && (
              <div className="mobile-work__links">
                {selectedProject.github.split(",").map((link, i) => (
                  <a
                    key={i}
                    href={link.trim()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.includes("github") ? "GitHub" : "Live Site"}
                  </a>
                ))}
              </div>
            )}
            <button
              className="mobile-work__close"
              onClick={() => setSelectedProject(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileWork;
