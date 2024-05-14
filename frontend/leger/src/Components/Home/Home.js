import React, { useState, useEffect } from 'react';
import TopNav from '../common/TopNav/TopNav';
import Footer from '../common/TopNav/Footer';

function Home() {
  const [visibleSection, setVisibleSection] = useState('vinceSummary');

  const sectionRefs = {
    vinceSummary: React.createRef(),
    workSummary: React.createRef(),
    aboutSummary: React.createRef(),
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = Object.keys(sectionRefs);
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      sections.forEach((section) => {
        const ref = sectionRefs[section].current;
        if (ref.offsetTop <= scrollPosition && ref.offsetTop + ref.offsetHeight > scrollPosition) {
          setVisibleSection(section);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionRefs]);

  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-r from-sky-500 to-indigo-500'>
      <div className='fixed top-0 left-0 right-0 z-50'>
        <TopNav />
      </div>
      <div className='flex-grow container mx-auto p-4 text-white pt-16 pb-16'>
        {Object.keys(sectionRefs).map((sectionKey, index) => (
          <div
            key={sectionKey}
            ref={sectionRefs[sectionKey]}
            className={`my-32 flex flex-col items-center transition-transform duration-500 ${
              visibleSection === sectionKey ? 'transform scale-105 opacity-100' : 'transform scale-90 opacity-50'
            }`}
          >
            <div className="text-center">
              <h2 className='text-3xl font-bold mb-4'>
                {sectionKey === 'vinceSummary'
                  ? "Hi! I'm Vince"
                  : sectionKey === 'workSummary'
                  ? 'Computer Engineer by day'
                  : 'Human being by night'}
              </h2>
            </div>
            <img
              src={
                sectionKey === 'vinceSummary'
                  ? 'https://res.cloudinary.com/dbhn8kvoh/image/upload/v1715665587/1580711639446_bivck7.jpg'
                  : sectionKey === 'workSummary'
                  ? 'https://res.cloudinary.com/dbhn8kvoh/image/upload/v1715665373/439987002_1657442948415271_8315619213850901408_n_bqrjkk.jpg'
                  : 'https://res.cloudinary.com/dbhn8kvoh/image/upload/v1712555490/pits_prom2_qshcsn.jpg'
              }
              alt={
                sectionKey === 'vinceSummary'
                  ? 'Description of Image 1'
                  : sectionKey === 'workSummary'
                  ? 'Description of Image 2'
                  : 'Description of Image 3'
              }
              className="w-1/3 mb-6 rounded-lg shadow-lg"
            />
            <div className="text-center">
              <p className='text-lg'>
                {sectionKey === 'vinceSummary'
                  ? "I graduated from the University of Saskatchewan with a Bachelor of Science in Engineering (B.E) majoring in Computer Engineering (Digital Systems and Software Specializations). I'm also a musician, playing a wide variety of instruments including the guitar, the bass (electric and upright), the drums, and the saxophone."
                  : sectionKey === 'workSummary'
                  ? 'As a graduate of the University of Saskatchewan, I strive to make optimal and effective designs. My areas of expertise include Embedded Systems, IOT, RTOS, Full-Stack Web Development, Client-Server Architecture, Agile, Scrum, and so much more. If you\'re looking for a specific skillset in a junior, I probably have it.'
                  : "It's no secret that I'm passionate about music. Outside of work, you can find me playing open mics with my band Palace in the Sky at Capitol Music Club in Saskatoon, SK. I am also willing to talk for hours about video games, where soulslikes and RPGs are my genres of interest."}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
