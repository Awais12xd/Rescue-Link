import React from 'react'
import Hero from '../components/Home/Hero.jsx'
import Navbar from '../components/Header/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import HomeContent from '../components/Home/HomeContent.jsx'

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <HomeContent />
      <Footer />
    </div>
  )
}

export default HomePage
