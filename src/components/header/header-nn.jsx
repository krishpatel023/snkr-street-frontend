import './header.css'
import {NavLink , useNavigate} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useRef } from "react";
import Logo from '../../assets/logo-black.png'
import { changeMode } from '../../utils/changeMode';
import { useSelector } from 'react-redux'
import {useCookies} from 'react-cookie'
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

    const items = useSelector((state)=> state.cart)

    const [cookies, setCookie, removeCookie] = useCookies([])
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [showDropDown, setDropDown] = useState(false)
    useEffect(()=>{
      if(cookies.userToken){
        setLoggedIn(true)
      }
    },[])
    const doChangeDropDown = ()=>{
      document.getElementById("dropDown").classList.toggle("toggle-nav-drop")
      setDropDown(!showDropDown)
    }
	return (
    <header>
      <div className="logo-section">
        {/* <img src={Logo} alt="" /> */}
        <NavLink to='/'><img src={Logo} alt="" /></NavLink>
      </div>
      <div className="detail-section">
        <nav ref={navRef}>
        
        <NavLink to='/search'>Products</NavLink>
        {/* <NavLink to='/about'>Product</NavLink> */}

        <button className="nav-mode" onClick={handleMode}>
            {
                mode?
                <i className="fa-solid fa-moon fa-xl"></i>
                :<i className="fa-solid fa-sun fa-xl"></i>
            }
            
        </button>
        <button className="nav-mode" name="cart" onClick={()=>{navigate('/cart')}}>
          <div className='cart-nav-1'><i className="fa-solid fa-cart-shopping "></i></div>
          <div className='cart-nav-2'><span>{items.length}</span></div>
        </button>

        {
          isLoggedIn?
            <div className='header-account'>
              <div className="header-account-show">
                  
                  {
                    showDropDown?
                    <button onClick={()=>{doChangeDropDown()}}><span>Hi, Krish</span><i className="fa-solid fa-caret-down fa-xl fa-rotate-180"></i></button>
                    :<button onClick={()=>{doChangeDropDown()}}><span>Hi, Krish</span><i className="fa-solid fa-caret-down fa-xl"></i></button>
                  }
                  
              </div>
              <div className="header-account-down toggle-nav-drop" id="dropDown">
                  <button onClick={()=>{navigate('/userSettings')}}>My Account</button>
                  <button onClick={()=>{navigate('/allOrders')}}>Orders</button>
                  <button>Logout</button>
              </div>
            </div>
          :
            <button className="login-btn" onClick={()=>{navigate('/login')}} >
              Login
            </button>
        }



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