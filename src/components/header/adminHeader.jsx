import './header.css'
import {NavLink , useNavigate} from 'react-router-dom';
import React, { useState } from 'react';
import { useRef } from "react";
import Logo from '../../assets/logo-black.png'
import { changeMode } from '../../utils/changeMode';
function Header() {
	const navRef = useRef(null);
    const navigate = useNavigate()
	function showNavbar(){
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};
    const [mode,setMode] = useState(false)

    const handleMode = ()=>{
        setMode(!mode)
        changeMode()
    }
	return (
    <header>
      <div className="logo-section">
        {/* <img src={Logo} alt="" /> */}
        <NavLink to='/'><img src={Logo} alt="" /></NavLink>
      </div>
      <div className="detail-section">
        <nav ref={navRef}>
        
        {/* <NavLink to='/search'>Products</NavLink> */}
        {/* <NavLink to='/about'>Product</NavLink> */}

        <button className="nav-mode" onClick={handleMode}>
            {
                mode?
                <i className="fa-solid fa-moon fa-xl"></i>
                :<i className="fa-solid fa-sun fa-xl"></i>
            }
            
        </button>
        {/* <button className="nav-mode" onClick={()=>{navigate('/cart')}}>
          <i className="fa-solid fa-cart-shopping "></i>
        </button> */}
        <button className="login-btn" onClick={()=>{navigate('/login')}} >
            Login
        </button>


        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <i className="fa-solid fa-xmark fa-xl"></i>
        </button>
        </nav>
      </div>
      <div className="btn-section">
        <button className="nav-btn" onClick={showNavbar}>
            <i className="fa-solid fa-bars fa-xl"></i>
        </button>
      </div>
    </header>
  );
}

export default Header;