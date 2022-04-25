import React from 'react'
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className='navbar'>
        <div className='navleft'>
            <ul className='navmenu'>
                <li className='navli'>
                <Link  to="/">Homepage</Link>
                </li>

                <li className='navli'>
                <Link  to="/add"> Add Film </Link>                   
                </li>
            </ul>
            
        </div>
    </nav>
  )
}

export default Navbar