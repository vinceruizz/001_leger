import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function TopNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (dest) => {
    switch (dest) {
      case 'home':    navigate('/home'); break;
      case 'my-work': navigate('/my-work'); break;
      case 'about':   navigate('/about'); break;
      default:        navigate('*'); break;
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  }

  return (
    <header className="flex justify-center pt-6">
      <nav className="bg-white shadow-lg rounded-full">
        <ul className="flex gap-6 px-6 py-4">
          <li><a onClick={() => handleNavigate('home')} className={`cursor-pointer ${(isActive('/home') || isActive('/*')) ? 'bg-blue-500 text-white rounded-full px-3 py-1' : 'hover:text-blue-500'}`}>Home</a></li>
          <li><a onClick={() => handleNavigate('my-work')} className={`cursor-pointer ${isActive('/my-work') ? 'bg-blue-500 text-white rounded-full px-3 py-1' : 'hover:text-blue-500'}`}>My Work</a></li>
          <li><a onClick={() => handleNavigate('about')} className={`cursor-pointer ${isActive('/about') ? 'bg-blue-500 text-white rounded-full px-3 py-1' : 'hover:text-blue-500'}`}>About</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default TopNav;
