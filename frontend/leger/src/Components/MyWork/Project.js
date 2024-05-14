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
                <p className="text-lg leading-relaxed mb-4">{project.full_description}</p>
                <button onClick={onClose} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" aria-label="Close">Close</button>
            </div>
        </div>
    );
}

export default Project;
