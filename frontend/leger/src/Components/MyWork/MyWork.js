import React, { useState, useEffect } from 'react';
import TopNav from '../common/TopNav/TopNav';
import Footer from '../common/TopNav/Footer';
import Project from './Project';

function MyWork() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProjects();
      setProjects(data);
    };
    fetchData();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('https://api.vinceruiz.com/project', {
        method: 'GET',
        headers: {
          'X-API-KEY': '+A7V2!CX*jT?^]n',
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        console.log("ERROR OH NO!!!");
        console.log(response.status);
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      return [];
    }
  };

  const handleProjectClick = project => {
    setSelectedProject(project);
  };

  return (
    <div className={`flex flex-col min-h-screen bg-gradient-to-r from-sky-500 to-indigo-500 ${selectedProject ? 'backdrop-filter backdrop-blur-sm' : ''}`}>
      <div className='fixed top-0 left-0 right-0 z-50'>
        <TopNav />
      </div>
      <div className='flex justify-center m-4 mt-8'>
        <h1 className='text-2xl font-semibold text-white items-center'>My Work</h1>
      </div>
      <div className='flex-grow container mx-auto p-4 text-white'>
        <div className='flex flex-row flex-wrap justify-center gap-4'>
          {projects.map(project => (
            <a 
              key={project.id} 
              onClick={() => handleProjectClick(project)} 
              className="cursor-pointer flex max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
            >
              <div className="flex-none w-1/3 p-2 border-r border-gray-200">
                <h5 className="mb-2 text-lg font-bold text-gray-900">Tech Stack</h5>
                <ul className="list-disc list-inside text-gray-700">
                  {project.preview_description.split(',').map((tech, index) => ( //Lazy way of displaying tech stack
                    <li key={index}>{tech.trim()}</li>
                  ))}
                </ul>
              </div>
              <div className="flex-grow p-2">
                <h5 className="mb-2 text-2xl font-bold text-gray-900">{project.title}</h5>
                {project.img_url && (
                  <img src={project.img_url} alt={project.title} className="rounded-lg shadow-md" />
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
      <Project project={selectedProject} onClose={() => setSelectedProject(null)} />
      <Footer />
    </div>
  );
}

export default MyWork;
