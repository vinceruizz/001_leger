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
    <div>
      <nav>
        <ul>
          <li><a onClick={() => handleNavigate('home')}>Home</a></li>
          <li><a onClick={() => handleNavigate('my-work')}>My Work</a></li>
          <li><a onClick={() => handleNavigate('about')}>About</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default TopNav