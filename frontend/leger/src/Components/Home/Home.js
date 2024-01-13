import React from 'react';
import TopNav from '../common/TopNav/TopNav';
import Footer from '../common/TopNav/Footer';

function Home() {
  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-r from-sky-500 to-indigo-500'>
      <TopNav />
      <div className='flex-grow container flex flex-col items-left mx-auto p-4 text-white'>
        <div className='summary1 my-6'>
          <h2 className='text-2xl font-semibold'>Hi! I'm Vince Ruiz</h2>
          <p className='text-l'></p>
        </div>
        <div className='workSummary my-6'>
          <h2 className='text-2xl font-semibold'>Computer Engineer by day</h2>
          <p className='text-l'>As a graduate of the University of Saskatchewan, I strive to make optimal and effective designs. My areas of expertise include Embedded
          Systems, IOT, RTOS, Full-Stack Web Development, Client-Server Architecture, Agile, Scrum, and so much more. If you're looking for a specific skillset in a junior, I probably have it.</p>
        </div>
        <div className='aboutSummary my-6'>
          <h2 className='text-2xl font-semibold'>Human being by night</h2>
          <p>It's no secret that I'm passionate about music. Outside of work, you can find me playing open mics with my band Palace in the Sky at Capitol Music Club in Saskatoon, SK. </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
