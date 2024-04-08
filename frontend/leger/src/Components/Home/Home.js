import React from 'react';
import TopNav from '../common/TopNav/TopNav';
import Footer from '../common/TopNav/Footer';

function Home() {
  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-r from-sky-500 to-indigo-500'>
      <TopNav />
      <div className='flex-grow container mx-auto p-4 text-white'>
        <div className='summary1 my-6 flex items-center'>
          <img src="/path-to-your-image-1.jpg" alt="Description of Image 1" className="w-1/3 mr-4"/>
          <div>
            <h2 className='text-2xl font-semibold'>Hi! I'm Vince</h2>
            <p className='text-l'>I graduated from the University of Saskatchewan with a Bachelor of Science in Engineering (B.E) majoring in Computer Engineering (Digital Systems and Software
            Specializations). I'm also a musician, playing a wide variety of instruments including the guitar, the bass (electric and upright), the drums, and the saxophone.</p>
          </div>
        </div>
        <div className='workSummary my-6 flex items-center'>
          <img src="/path-to-your-image-2.jpg" alt="Description of Image 2" className="w-1/3 mr-4"/>
          <div>
            <h2 className='text-2xl font-semibold'>Computer Engineer by day</h2>
            <p className='text-l'>As a graduate of the University of Saskatchewan, I strive to make optimal and effective designs. My areas of expertise include Embedded
            Systems, IOT, RTOS, Full-Stack Web Development, Client-Server Architecture, Agile, Scrum, and so much more. If you're looking for a specific skillset in a junior, I probably have it.</p>
          </div>
        </div>
        <div className='aboutSummary my-6 flex items-center'>
          <img src="https://res.cloudinary.com/dbhn8kvoh/image/upload/v1712555490/pits_prom2_qshcsn.jpg" alt="Description of Image 3" className="w-1/3 mr-4"/>
          <div>
            <h2 className='text-2xl font-semibold'>Human being by night</h2>
            <p>It's no secret that I'm passionate about music. Outside of work, you can find me playing open mics with my band Palace in the Sky at Capitol Music Club in Saskatoon, SK. I am also
              willing to talk for hours about video games, where soulslikes and RPGs are my genres of interest.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
