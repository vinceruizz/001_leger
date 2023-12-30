import React from 'react'
import TopNav from '../common/TopNav/TopNav'

function Home() {
  return (
    <div>
      <TopNav />
      <div className='summary1'>
        <h2>A glimpse into my journey as a computer engineer</h2>
      </div>
      <div className='workSummary'>
        <h2>Computer Engineer by day</h2>
        <p></p>
      </div>
      <div className='aboutSummary'>
        <h2>Human being by night</h2>
      </div>

    </div>
  )
}

export default Home