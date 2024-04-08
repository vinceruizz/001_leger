import React from 'react';

function Footer() {
  const handleNavigate = (dest) => {
    // Navigation logic here
  };

  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <nav className="container mx-auto p-4">
        <ul className="flex justify-center">
          <li className="mx-3">
            <a href='https://github.com/vinceruizz' className="hover:text-blue-400 cursor-pointer">Github</a>
          </li>
          <li className="mx-3">
            <a href='https://www.linkedin.com/in/vince-ruiz' className="hover:text-blue-400 cursor-pointer">LinkedIn</a>
          </li>
          <li className="mx-3">
            <a onClick={() => handleNavigate('about')} className="hover:text-blue-400 cursor-pointer">CV</a>
          </li>
        </ul>
      </nav>
      <div className="text-center text-gray-400 text-sm py-4">
        © 2024 Vince Ruiz. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
