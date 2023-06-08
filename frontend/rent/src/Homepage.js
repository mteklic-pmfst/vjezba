import React from 'react'
import Slideshow from './components/slideshow';
import Choosing from './components/biranje';


function Homepage() {
  return (
    <div>
      <Choosing />
      <Slideshow />
    </div>
  )
}

export default Homepage;