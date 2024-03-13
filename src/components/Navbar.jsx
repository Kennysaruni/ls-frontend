import React from 'react'
import './Navbar.css'
import logo from '../assets/logo 2.svg'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='nav-container'>
        <img src={logo} alt="logo" className="logo" />
        <div className="nav-items">
          <div className='nav-item'>
            <Link to='/'>Home</Link>
            </div>
          <div className='nav-item'>
          <Link to='/notfound'>Resources</Link>
            </div>
          <div className='nav-item'>
          <Link to='/links'>Links</Link>
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