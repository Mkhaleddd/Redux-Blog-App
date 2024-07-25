import React from 'react'
import { Link } from "react-router-dom"

const Header = () => {
  
  return (
   <header className="Header">
    <a href="#content" className="skip-nav-link" >skip navigation</a>
     <nav className="top-nav" aria-label=" navigation">
     <h1> Post Blog</h1>
    <input id="menu-toggle" type="checkbox" />
    <label className='menu-button-container' htmlFor="menu-toggle">
    <div className='menu-button'></div>
  </label>
    <ul className="menu">
    <li ><Link to="Redux-Blog-App" className=' link'>Posts</Link></li>
    <li><Link to="post" className=' link'>Add New Post</Link></li>
  
    </ul>
  </nav> 
  </header>
    

  )
}

export default Header