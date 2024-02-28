import React from 'react'
import './Navbar.css'
import logo from '../assets/logo 2.svg'

function Navbar() {
  return (
    <div className='nav-container'>
        <img src={logo} alt="logo" className="logo" />
        <div className="nav-items">
          <div className='nav-item'>
            <a href="">Features</a>
            </div>
          <div className='nav-item'>
            <a href="">Resources</a>
            </div>
          <div className='nav-item'>
           <a href="">Help</a>
            </div>
            <div className="login">
              <button className="sign-in">Sign in</button>
              <button className="get-started">Get Started</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar