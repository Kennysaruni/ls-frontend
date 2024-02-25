import React from 'react'
import './Navbar.css'
import logo from '../assets/logo 2.svg'

function Navbar() {
  return (
    <div className='nav-container'>
        <img src={logo} alt="logo" className="logo" />
    </div>
  )
}

export default Navbar