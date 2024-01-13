import React from 'react'
import { useNavigate } from 'react-router-dom'

function TopNav() {
  const navigate = useNavigate();

  const handleNavigate = (dest) => {
    switch (dest) {
      case 'home':    navigate('/home'); break;
      case 'my-work': navigate('/my-work'); break;
      case 'about':   navigate('/about'); break;
      default:        navigate('*'); break;
    }
  };


  return (
    <header className="flex justify-center pt-6">
      <nav className="bg-white shadow-lg rounded-full">
        <ul className="flex gap-6 px-6 py-4">
          <li><a onClick={() => handleNavigate('home')} className="hover:text-blue-500 cursor-pointer">Home</a></li>
          <li><a onClick={() => handleNavigate('my-work')} className="hover:text-blue-500 cursor-pointer">My Work</a></li>
          <li><a onClick={() => handleNavigate('about')} className="hover:text-blue-500 cursor-pointer">About</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default TopNav