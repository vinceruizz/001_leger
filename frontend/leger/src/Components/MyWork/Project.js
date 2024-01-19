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
        onClick={handleOverlayClick} // Add click listener here
      >
        <div className="bg-white p-4 rounded">
          <h2>{project.title}</h2>
          <p>{project.full_description}</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
}

export default Project;
  