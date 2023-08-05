// import OrderDetail from '../../components/order-detail/orderDetail'
import './specificOrder.css'
import Header from '../../components/header/header'
import OrderProduct from '../../components/order-box/orderProduct'
import { config, currency ,backendURL} from '../../utils/utils'
import {useNavigate, useParams} from 'react-router'
import Tracker from '../../components/tracker/tracker'
import { useEffect, useState } from 'react'
import axios from 'axios'

function SpecificOrder() {
    const navigate = useNavigate()
    const [date,setDate] = useState()
    const [month,setMonth] = useState()
    const [year,setYear] = useState()
    const {OID} = useParams()
    const [dataBase,setDataBase] = useState()
    const [address,setAddress] = useState()

    useEffect(()=>{
        getData()
        
    },[])

    const getData = async()=>{
        const data = await axios.get(`${backendURL}/api/orders/${OID}`,config)
        setDataBase(data.data)
        getDate(data.data.OrderPlacedDate)
        getAddress(data.data.Address)
    }
    const getAddress = async(id)=>{
        console.log(id);
        const data = await axios.get(`${backendURL}/api/address/specific/${id}`,config)
        setAddress(data.data)
        
    }
    const getDate = async(inp)=>{
        const mydate = new Date(inp)
        setDate(mydate.getDate())
        setMonth(mydate.getMonth())
        setYear(mydate.getFullYear())
    }
    console.log(dataBase);
    console.log(address);
  return (
    <>
    <Header/>
    {
        dataBase?
        <div className="order-detail-wrapper background flex">
            <div className="order-detail-box secondary-bg flex">
                <div className="order-detail-centering flex-column">
                    <div className="order-detail-section-info">
                        <span><button onClick={()=>navigate('/allOrders')}>ORDERS</button><i className="fa-solid fa-chevron-right"></i> ID {dataBase.OrderId}</span>
                    </div>
                    <div className="order-detail-section-1">
                        <h2>ORDER # {dataBase.OrderId}</h2>
                        <button className='btn-accent'><i className="fa-solid fa-receipt"></i> Invoice</button>
                    </div>
                    <div className="order-detail-section-2">
                        <span>Order Date : <h3> {date}-{month}-{year}</h3></span>
                    </div>
                    <div className="order-detail-slash"></div>
                    {
                        dataBase.Products.map((data,i)=>
                        <div className="order-detail-product flex" key={i}>
                            <OrderProduct 
                                data={data}
                                key={i}
                                allowReview={true}
                            />
                        </div>
                        )
                    }


                    <div className="order-detail-slash"></div>
                    <div className="order-detail-section-3">
                        <div className="order-detail-payment">
                            <h3>Payment</h3>
                            <span>{dataBase.ModeOfPayment}</span>
                        </div>
                        <div className="order-detail-address">
                            <h3>Delivery</h3>
                            {
                                address?
                                <>
                                <h4>{address.Title}</h4>
                                <span>{address.Street}</span>
                                <span>{address.Area}</span>
                                <span>{address.City}</span>
                                <span>{address.State}</span>
                                <span>{address.Pincode}</span>
                                </>
                                :null
                            }

                        </div>
                    </div>
                    <div className="order-detail-slash"></div>
                    <h3>Order Tracking</h3>
                    <div className="order-detail-track">
                        <Tracker
                            stage={`${dataBase.Status}`}
                        />
                    </div>
                    <div className="order-detail-slash"></div>
                    <div className="order-detail-section-4">
                        <h3 className='order-detail-section-4-h3'>Order Summary</h3>
                        <span>Subtotal <h3>{currency}{dataBase.Amount}</h3></span>
                        <span>Delivery <h3>{currency}100</h3></span>
                        <div className="order-detail-slash-sp"></div>
                        <span><h2>Total</h2> <h2>{currency}{dataBase.Amount + 100}</h2></span>
                    </div>
                </div>
            </div>
        </div>
        :null
    }
    
    </>
  )
}

export default SpecificOrder
