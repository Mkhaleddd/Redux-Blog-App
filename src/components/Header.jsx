import React from 'react'
import { Link } from "react-router-dom"
import { AiOutlineMenu } from "react-icons/ai";
import { MdClose } from "react-icons/md";

const Header = () => {
  const [toggle,setToggle]=React.useState(false);

  return (
   <header className="Header">
            <h1> Post Blog</h1>
         <nav aria-label="host navigation">   
            <a href="#content" className="skip-nav-link" >skip navigation</a>
                <ul className='desktop-nav'> 
                    <li ><Link to="/" className='accent-pr link'>Posts</Link></li>
                    <li><Link to="post" className='accent-sc link'>Add New Post</Link></li>
                </ul>
                <div className="mobile-nav">
                  
                 {!toggle && <button className='dropdown-btn' aria-expanded="false" aria-hidden="true" onClick={()=>setToggle(prev=>!prev)} >
                    <AiOutlineMenu />
                  </button>}
                {toggle &&   <div className='toggle-menu'>
                              <button  className='close-btn' aria-hidden="true"  aria-expanded="false" onClick={()=>setToggle(prev=>!prev)}>
                                  <MdClose />
                                </button>
                                  <ul > 
                                      <li ><Link to="/" className='accent-pr link'>Posts</Link></li>
                                      <li><Link to="post" className='accent-sc link'>Add New Post</Link></li>
                                  </ul>
                             </div>
                    }
                </div>
            </nav>
        </header>
    

  )
}

export default Header