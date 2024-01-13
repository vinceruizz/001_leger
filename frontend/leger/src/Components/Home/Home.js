import React from 'react';
import TopNav from '../common/TopNav/TopNav';

function Home() {
  return (
    <div className='bg-gradient-to-r from-sky-500 to-indigo-500 min-h-screen'>
      <TopNav />
      <div className='container mx-auto p-4 text-white'>
        <div className='summary1 my-6'>
          <h2 className='text-xl font-semibold'>A glimpse into my journey as a computer engineer</h2>
        </div>
        <div className='workSummary my-6'>
          <h2 className='text-xl font-semibold'>Computer Engineer by day</h2>
          <p className='text-sm'>As a graduate of the University of Saskatchewan</p>
        </div>
        <div className='aboutSummary my-6'>
          <h2 className='text-xl font-semibold'>Human being by night</h2>
        </div>
      </div>
    </div>
  );
}

export default Home;
