import './cart.css'
import Header from '../../components/header/header'
import {config, currency , backendURL, units} from '../../utils/utils'
import album from '../../assets/album.jpeg'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import ImageDoc from '../../components/image/image'
import {increaseQty, decreaseQty, remove} from '../../store/cartSlice'
import { current } from '@reduxjs/toolkit'
import axios from 'axios'

import EmptyCart from '../../assets/empty-cart.png'
import { useCookies } from 'react-cookie'
import Alert from '../../components/alert/alert'
export default function Cart(){
    const dataBase = [1,2,3,4,,5]
    const navigate = useNavigate()
    const handleCheck = (num)=>{
        var element = document.getElementById(num);
        element.classList.toggle("checked");
    }

    const items = useSelector((state)=> state.cart)

    const [Total , setTotal] = useState(0)
    let currentTotal = 0
    useEffect(()=>{
        currentTotal = 0
        items.map((data)=>{
            setTotal(currentTotal + ((data.ProductQty)*(data.Amount)))
            currentTotal = currentTotal + ((data.ProductQty)*(data.Amount))
        
        })
        currentTotal = 0
        if(items.length === 0){
            setTotal(0)
        }
    },[items])

    const dispatch = useDispatch()
    const clickIncrease = (i)=>{
        dispatch(increaseQty(items[i]))
    }
    const clickDecrease = (i)=>{
        dispatch(decreaseQty(items[i]))
    }
    const clickRemove = (i)=>{
        dispatch(remove(items[i]))
    }
    const [cookies, setCookie, removeCookie] = useCookies()
    const [messageData, setMessage] = useState()
    const [msgType, setMsgType] = useState()
    const placeOrder = async()=>{
        if(cookies.userToken){
            navigate('/orderPlacement')
        }
        else{
            setMessage("PLEASE LOGIN IN ORDER TO PLACE ORDER")
            setMsgType("error")
        }
    }
    return(
        <>
            <Header/>
            <div className="cart-wrapper background">
                <div className="cart-box bg-secondary">
                    <Alert
                        message={messageData}   
                        type = {msgType}
                    />
                    <div className="cart-product-section secondary-bg">
                        {
                            items?.length > 0?
                            <div className="cart-product-box ">
                                <h1>Order</h1>
                                {
                                    items?
                                    items.map((data,i)=>
                                    <div className="cart-product" id={`${i}`} key={i}>
                                        <div className="cart-product-image">
                                            <ImageDoc id={data.Image}/>
                                        </div>
                                        <div className="cart-product-data">

                                            <span>
                                                <h3>{data.Name}</h3>
                                                <h3>{data.SelectedSize} {units}</h3>
                                                <h3>{currency}{data.Amount}</h3>
                                                <div className='cart-product-qty flex'>
                                                    <div className="cart-product-qty-subdiv flex">
                                                        <button onClick={()=>{clickDecrease(i)}}><i className="fa-solid fa-minus fa-xl"></i></button>
                                                        <div className='cart-product-qty-num'><span>{data.ProductQty}</span></div>
                                                        <button onClick={()=>{clickIncrease(i)}}><i className="fa-solid fa-plus fa-xl"></i></button>
                                                    </div>
                                                </div>
                                            </span>


                                            <div className="cart-product-remove">
                                                <button onClick={()=>{clickRemove(i)}}><i className="fa-solid fa-trash"></i></button>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    ):null
                                }
                                <h2>Total : {Total}</h2>
                                <div className="cart-proceed-btn">
                                    <button className='button' onClick={()=>{placeOrder()}}>Proceed <i className="fa-solid fa-check"></i></button>
                                </div>
                            </div>
                            :
                            <div className="empty-cart-img">
                                <img src={EmptyCart} alt="" />
                                <h2>YOUR CART IS CURRENTLY EMPTY.</h2>
                                <h3>ADD PRODUCTS TO PROCEED</h3>
                                <button onClick={()=>{navigate('/search')}}>CONTINUE SHOPPING <i className="fa-solid fa-cart-shopping"></i></button>
                            </div>
                        }

                    </div>
                    <div className="cart-promo-section secondary-bg">
                        <div className="cart-promo-box">
                            <h1>Have Any Promo Code?</h1>
                            <span><h3>Note</h3>Only one discount coupon can be redeemed at a time. Any offer can't be clubbed together. </span>
                            <input type="text" placeholder='Coupon Code'/>
                            <div className="cart-promo-btn">
                                <button className='button'>Apply</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}