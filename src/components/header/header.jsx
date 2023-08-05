import { useEffect, useState } from 'react';
import './header.css'
import { Link, useNavigate } from 'react-router-dom'
import LOGO from '../../assets/logo-black.png'
import LOGOSmall from '../../assets/logo-small.png'
import userImg from '../../assets/default_user.jpg'
import { useSelector } from 'react-redux'
import {useCookies} from 'react-cookie'
import Alert from '../alert/alert';
export default function Header() {
  const navigate= useNavigate()

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
  const clickLogout = ()=>{
    doChangeDropDown()
    setLoggedIn(false)
    removeCookie("userToken")
    setMessage("YOU HAVE BEEN LOGGED OUT SUCCESSFULLY")
    setMsgType("success")
    navigate("/")
  }
  const [messageData, setMessage] = useState()
  const [msgType, setMsgType] = useState()
  return (
    <>
    <div className='header-wrapper'>
      <div className="header-logo-section">
        <Link to='/' className='link'><img src={LOGO}></img></Link>
      </div>
      <div className="header-logo-section-2">
        <Link to='/' className='link'><img src={LOGOSmall}></img></Link>
      </div>
      <div className="header-other-section">
        <Link to='/search' className='link-search'>Products</Link>
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
                    <button onClick={()=>{doChangeDropDown()}}><div className="user-img-down"><img src={userImg} alt="" /></div><i className="fa-solid fa-caret-down fa-xl fa-rotate-180"></i></button>
                    :<button onClick={()=>{doChangeDropDown()}}><div className="user-img-down"><img src={userImg} alt="" /></div><i className="fa-solid fa-caret-down fa-xl"></i></button>
                  }
                  
              </div>
              <div className="header-account-down toggle-nav-drop" id="dropDown">
                  <button onClick={()=>{navigate('/userSettings')}}>My Account</button>
                  <button onClick={()=>{navigate('/allOrders')}}>Orders</button>
                  <button onClick={()=>{clickLogout()}}>Logout</button>
              </div>
            </div>
          :
            <div className='header-account'>
              <div className="header-account-show">
                  
                  {
                    showDropDown?
                    <button onClick={()=>{doChangeDropDown()}}><div className="user-img-down"><img src={userImg} alt="" /></div><i className="fa-solid fa-caret-down fa-xl fa-rotate-180"></i></button>
                    :<button onClick={()=>{doChangeDropDown()}}><div className="user-img-down"><img src={userImg} alt="" /></div><i className="fa-solid fa-caret-down fa-xl"></i></button>
                  }
                  
              </div>
              <div className="header-account-down toggle-nav-drop for-login" id="dropDown">
                  <button onClick={()=>{navigate('/login')}}>Login</button>
              </div>
            </div>
        }
      </div>
    </div>
    <Alert
        message={messageData}   
        type = {msgType}
    />
    </>
  )
}
