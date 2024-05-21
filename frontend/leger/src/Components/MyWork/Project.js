import React from "react";

function Project({ project, onClose }) {
    if (!project) return null;

    // Function to handle click on the overlay
    const handleOverlayClick = e => {
        // Check if the click is directly on the overlay
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Process the github and site links
    const [githubLink, siteLink] = project.github ? project.github.split(',').map(link => link.trim()) : []; //lazy way to add site link (if there is one); the site link will be comma separated in the github field

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex justify-center items-center"
            onClick={handleOverlayClick}
            role="dialog"
            aria-modal="true"
        >
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-4">
                <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
                <img src={project.img_url} alt={`${project.title} image`} className="w-full h-auto mb-4 rounded" />
                <div className="flex justify-center mb-4">
                    {githubLink && (
                        <a href={githubLink} target="_blank" rel="noopener noreferrer" className="mr-4">
                            <img src="/github-142-svgrepo-com.svg" alt="GitHub" className="w-6 h-6" />
                        </a>
                    )}
                    {siteLink && (
                        <a href={siteLink} target="_blank" rel="noopener noreferrer">
                            <img src="/link-svgrepo-com.svg" alt="Site" className="w-6 h-6" />
                        </a>
                    )}
                </div>
                <p className="text-lg leading-relaxed mb-4">{project.full_description}</p>
                <button onClick={onClose} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" aria-label="Close">Close</button>
            </div>
        </div>
    );
}

export default Project;
