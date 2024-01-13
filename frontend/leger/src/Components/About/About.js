import React from 'react'
import TopNav from '../common/TopNav/TopNav';
import Footer from '../common/TopNav/Footer';

function About() {
    return (
        <div className='flex flex-col min-h-screen bg-gradient-to-r from-sky-500 to-indigo-500'>
          <TopNav />
          <div className='flex-grow container flex flex-col items-center mx-auto p-4 text-white'>
            <div className='summary1 my-6'>
              <h2 className='text-2xl font-semibold'>Hi! I'm Vince</h2>
              <p className='text-l'></p>
            </div>
            <div className='aboutSummary my-6'>
              <h2 className='text-2xl font-semibold'>Human being by night</h2>
            </div>
          </div>
          <Footer />
        </div>
      );
}

export default About