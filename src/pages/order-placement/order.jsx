import Header from '../../components/header/header'
import './order.css'
import { config, currency , backendURL, units} from '../../utils/utils'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import createRandom from '../../utils/createRandom'
import { useCookies } from 'react-cookie'
import { auth } from '../../utils/firebase'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../../components/alert/alert'
import { emptyCart } from '../../store/cartSlice'
export default function Order(){

    const navigate = useNavigate()
    const [showAddress, setShowAddress] = useState(false)
    const [title, setTitle] = useState()
    const [street, setStreet] = useState()
    const [area , setArea ] = useState()
    const [city , setCity] = useState()
    const [state, setState] = useState()
    const [pinCode, setPinCode] = useState()

    const [userId, setUserId] = useState()
    const [addresses, setAddresses] = useState()
    const [cookies, setCookie, removeCookie] = useCookies([])

    // ALERT
    const [messageData, setMessage] = useState()
    const [msgType, setMsgType] = useState()

    useEffect(()=>{
        if(cookies.userToken){
            setUserId(cookies.userToken);
            getAddresses(cookies.userToken)
        }
        if(items?.length === 0){
            navigate('/search')
        }
    },[])
    const getAddresses = async(id)=>{
        const data = await axios.get(`${backendURL}/api/address/${id}`,config)
        setAddresses(data.data)
    }
    const addAddress = async()=>{
        try {
            const Addressid = createRandom(20)
            console.log(userId);
            await axios.post(`${backendURL}/api/address/createAddress/${userId}`, {
                AddressId : Addressid,
                Title : title,
                Street : street,
                Area : area,
                City : city,
                State : state,
                Pincode : pinCode
            },config)
            setMessage("ADDRESS ADDED SUCCESSFULLY")
            setMsgType("success")
            setShowAddress(false)
            getAddresses(userId)
            navigate('/orderPlacement')    
        } catch (error) {
            setMessage("AN ERROR OCCURED : PLEASE TRY AGAIN")
            setMsgType("error")
        }
    }

    const items = useSelector((state)=> state.cart)
    const [Total , setTotal] = useState(0)
    let currentTotal = 0
    useEffect(()=>{
        currentTotal = 0
        items.map((data)=>{
            setTotal(currentTotal + ((data.ProductQty)*(data.Amount)))
            currentTotal = currentTotal + ((data.ProductQty)*(data.Amount))
        }
            
        )
        currentTotal = 0
        if(items.length === 0){
            setTotal(0)
        }
    },[items])
    const Mop = (num)=>{
        if(num === 1){
            return "CASH"
        }
        if(num === 2){
            return "DEBIT CARD"
        }
        if(num === 3){
            return "CREDIT CARD"
        }
        if(num === 4){
            return "PAYPAL"
        }
    }
    const [error, setError] = useState()
    const placeOrder = async()=>{
        const orderNum = createRandom(20)
        const paymentMode = Mop(lastSelectedPayment)
        const dateOf = new Date()
        console.log(dateOf)

        if(lastSelectedAddress === -1){
            setError("PLEADE SELECT AN ADDRESS")
        }
        else if(lastSelectedPayment === -1){
            setError("PLEADE SELECT A PAYMENT METHOD")
        }
        else{

        
        try{
            await axios.post(`${backendURL}/api/orders/createOrder/${userId}`,{
                OrderId : orderNum,
                Address: addresses[lastSelectedAddress].AddressId,
                Status : 0,
                Amount : Total,
                ModeOfPayment : paymentMode,
                OrderPlacedDate : dateOf,
                Products : items
            },config)
            clrCart()
        }catch(err){
            console.log(err);
        }
        
        navigate('/orderConfirmation')

        }
    }
    const dispatch = useDispatch()
    const clrCart = ()=>{
        dispatch(emptyCart())
    }
    var lastSelectedAddress = -1
    const selectAddress = async(num)=>{
        if(lastSelectedAddress === -1){
            document.getElementById(`address-${num}`).classList.add('order-selected')
            lastSelectedAddress = num
        }
        else{
            document.getElementById(`address-${lastSelectedAddress}`).classList.remove('order-selected')
            document.getElementById(`address-${num}`).classList.add('order-selected')
            lastSelectedAddress = num
        }
    }
    var lastSelectedPayment = -1
    const selectPayment = async(num)=>{
        if(lastSelectedPayment === -1){
            document.getElementById(`mop-${num}`).classList.add('order-selected')
            lastSelectedPayment = num
        }
        else{
            document.getElementById(`mop-${lastSelectedPayment}`).classList.remove('order-selected')
            document.getElementById(`mop-${num}`).classList.add('order-selected')
            lastSelectedPayment = num
        }
    }



    return(
        <>
            <div className="order-wrapper background">

                <div className="order-place-navbar">
                    <Header />
                </div>
                <Alert
                    message={messageData}   
                    type = {msgType}
                />
                <div className="order-box secondary-bg">
                    <div className="order-sub-box">
                        <h1>Saved Addresses</h1>
                        <div className="order-address-section scrollbar-horizontal">
                            {   
                                addresses?
                                <>
                                {
                                    addresses.length > 0?
                                    
                                addresses.map((data,i)=>
                                <button className="order-address-box" id={`address-${i}`} key={i} onClick={()=>{selectAddress(i);setError()}}> 
                                    <h4>{data.Title}</h4><br />
                                    <span>{data.Street}</span><br />
                                    <span>{data.Area}</span><br />
                                    <span>{data.City}</span><br />
                                    <span>{data.State}</span><br />
                                    <span>{data.Pincode}</span>
                                </button>)
                                :null
                                }
                                </>

                                
                                :null
                            }

                            <button className="order-address-add-btn" onClick={()=>{setShowAddress(true);setError()}}><i className="fa-solid fa-plus fa-2xl"></i></button>
                        </div>
                        {
                            showAddress?
                            <>
                            <h1>Add A New Address</h1>
                                {/* HHHH */}
                                <div className="add-address-box-order-place">

                                
                                <div className="form">
                                    <label className="field">
                                        <span className="field__label" htmlFor="address">Title</span>
                                        <input className="field__input" type="text" id="address"  onChange={(e)=>{setTitle(e.target.value)}}/>
                                    </label>
                                    <label className="field">
                                        <span className="field__label" htmlFor="address">Address</span>
                                        <input className="field__input" type="text" id="address" onChange={(e)=>{setStreet(e.target.value)}}/>
                                    </label>
                                    <label className="field">
                                        <span className="field__label" htmlFor="address">Area</span>
                                        <input className="field__input" type="text" id="address" onChange={(e)=>{setArea(e.target.value)}}/>
                                    </label>
                                    <div className="fields fields--3">
                                        <label className="field">
                                        <span className="field__label" htmlFor="zipcode">Zip code</span>
                                        <input className="field__input" type="text" id="zipcode" onChange={(e)=>{setPinCode(e.target.value)}}/>
                                        </label>
                                        <label className="field">
                                        <span className="field__label" htmlFor="city">City</span>
                                        <input className="field__input" type="text" id="city" onChange={(e)=>{setCity(e.target.value)}}/>
                                        </label>
                                        <label className="field">
                                        <span className="field__label" htmlFor="state">State</span>
                                        <input className="field__input" type="text" id="state" onChange={(e)=>{setState(e.target.value)}}/>
                                        </label>
                                    </div>
                                </div>
                                <div className="address-proceed-btn">
                                    <button className='button' onClick={()=>{addAddress()}}>ADD ADDRESS <i className="fa-solid fa-check"></i></button>
                                </div>
                                </div>
                            {/* </div> */}
                            </>
                            :null
                        }

                        <h1>Mode Of Payment</h1>
                        <div className="order-payment-mode">
                            <button className='order-payment-mode-btn' id="mop-1" onClick={()=>{selectPayment(1);setError()}}>Cash</button>
                            <button className='order-payment-mode-btn' id="mop-2" onClick={()=>{selectPayment(2);setError()}}>Debit Card</button>
                            <button className='order-payment-mode-btn' id="mop-3" onClick={()=>{selectPayment(3);setError()}}>Credit Card</button>
                            <button className='order-payment-mode-btn' id="mop-4" onClick={()=>{selectPayment(4);setError()}}>Paypal</button>
                        </div>
                        <div className='order-proceed-btn'>
                            <button className='button' onClick={()=>{placeOrder()}}>Proceed <i className='fa-solid fa-check'></i></button>
                        </div>
                        {
                            error?
                            <span name="error">{error}</span>
                            :null
                        }
                    </div>
                    <div className="order-sub-box-2">
                            <h1>Order Summary</h1>
                            {
                                items?
                                items.map((data,i)=>
                                <span key={i}><div><h4>{data.Name}</h4> <h4>Qty : {data.ProductQty}</h4> <h4>Size : {data.SelectedSize} {units}</h4></div> <h4> {currency}{data.Amount}</h4></span>
                                )
                                :null
                            }
                            
                            <div className="order-slash"></div>
                            <span>Subtotal <h3>{currency}{Total}</h3></span>
                            <span>Delivery <h3>{currency}100</h3></span>
                            <div className="order-slash"></div>
                            <span><h2>Total</h2> <h2>{currency}{Total + 100}</h2></span>
                    </div>
                </div>
            </div>
        </>
    )
}



