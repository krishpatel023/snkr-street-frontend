import './product.css'
import album from '../../assets/album.jpeg'
import { currency } from '../../utils/utils'
import Review from '../../components/reviews/review'
import Header from '../../components/header/header'
import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { backendURL,config } from '../../utils/utils'
import ImageDoc from '../../components/image/image'
import Slash from '../../assets/slash.png'
import { add } from '../../store/cartSlice'
import { useDispatch } from 'react-redux'
import Alert from '../../components/alert/alert'
export default function Product(){
    let lastSelected = -1
    const navigate = useNavigate()
    const colorClick = (clr)=>{

        if(lastSelected !== -1){
            document.getElementById(`clr-${lastSelected}`).classList.remove("product-box-shadow")
        }
        document.getElementById(`clr-${clr}`).classList.toggle("product-box-shadow")
        lastSelected = clr
    }
    const {PID} = useParams()
    const [dataBase, setDataBase] = useState()
    useEffect(()=>{
        getData()
    },[])
    const getData = async ()=>{
        const data = await axios.get(`${backendURL}/api/products/${PID}`,config)
        setDataBase(data.data)
    }

    const dispatch = useDispatch()
    const addInCart = async ()=>{
        dispatch(add(
            {...dataBase , 
             ProductQty : 1,
             SelectedSize : dataBase.Size[lastSelected]
            }
        ))
    }
    const addToCart = ()=>{
        if(lastSelected === -1){
            setMessage("PLEASE SELECT A SIZE")
            setMsgType("error")
        }
        else{
            setMessage("PRODUCT ADDED TO CART")
            setMsgType("success")
            addInCart()
        }
    }

    // ALERT
    const [messageData, setMessage] = useState()
    const [msgType, setMsgType] = useState()

    return( 
        <>
        <Header/>
        {
            dataBase?
            <div className="product-wrapper background">
            <Alert
                message={messageData}   
                type = {msgType}
            />
            <div className="product-box">
                <div className="product-back-section">
                    <div className="product-back-btn">
                        {/* <button className='button' onClick={()=>{navigate(-1)}}><i className="fa-solid fa-arrow-left-long fa-2xl"></i></button> */}
                        <span><button onClick={()=>{navigate('/search')}}>PRODUCTS</button> / {dataBase.Name}</span>
                    </div>
                </div>
                <div className="product-detail-section">
                    <div className="product-img">
                        <ImageDoc id={dataBase.Image}/> 
                    </div>
                    <div className="product-detail">
                        <h1>{dataBase.Name}</h1>
                        <h2>{currency} {dataBase.Amount}</h2>
                        <div className="product-size">
                            {
                                dataBase?
                                dataBase.Size.map((data, i)=>
                                <div key={i}>
                                {
                                    dataBase.Qty[i] !== 0 
                                    ?
                                    <div className="product-size-btn-wrapper" key={i} id={`clr-${i}`}>
                                        <button onClick={()=>{colorClick(i)}} >{data} UK</button>
                                    </div>
                                    :
                                    <div className="product-size-btn-wrapper" key={i}>
                                        <button>{data} UK</button>
                                        <div className="product-size-not-available">
                                            <img src={Slash} alt="" />
                                        </div>
                                    </div>
                                }
                                </div>)
                                :
                                null
                            }
                        </div>
                        <div className="product-description">
                            <p>{dataBase.Description}</p>
                        </div>
                        <div className="product-action-btn-section">
                            <div className="product-action-btn">
                                <button onClick={()=>{addToCart()}}>Add To Cart <i className="fa-solid fa-cart-shopping fa-xl"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        :null
        }
        
        </>
    )
}