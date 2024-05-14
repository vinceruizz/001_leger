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
      const response = await fetch('http://3.15.2.128:8080/project', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': '+A7V2!CX*jT?^]n'
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
      <TopNav />
      <div className='flex justify-center m-4 mt-8'>
        <h1 className='text-2xl font-semibold text-white items-center'>My Work</h1>
      </div>
      <div className='flex-grow container mx-auto p-4 text-white'>
        <div className='flex flex-row flex-wrap justify-center gap-4'>
          {projects.map(project => (
            <a 
              key={project.id} 
              onClick={() => handleProjectClick(project)} 
              className="cursor-pointer flex flex-col block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{project.title}</h5>
              <p className="font-normal text-gray-700 flex-grow">{project.preview_description}</p>
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
