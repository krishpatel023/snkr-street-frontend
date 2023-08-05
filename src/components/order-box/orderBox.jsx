import { useEffect, useState } from 'react'
import './orderBox.css'
import OrderProduct from './orderProduct'
import {useNavigate} from 'react-router'
export default function OrderBox(props){
    const navigate = useNavigate()
    const [date,setDate] = useState()
    const [month,setMonth] = useState()
    const [year,setYear] = useState()
    useEffect(()=>{
        if(props.data){
            const mydate = new Date(props.data.OrderPlacedDate)
            setDate(mydate.getDate())
            setMonth(mydate.getMonth())
            setYear(mydate.getFullYear())
        }
    },[])
    return(
        <>
            <div className="order-box-wrapper">
                <div className="order-box-section-1 flex">
                    <div className="order-placed-date flex-column">
                        <h3>ORDER PLACED</h3>
                        <span>{date}-{month}-{year}</span>
                    </div>
                    <div className="order-total flex-column">
                        <h3>TOTAL</h3>
                        <span>{props.data.Amount}</span>
                    </div>
                    <div className="order-number flex">
                        <h3>ORDER # {props.data.OrderId}</h3>
                    </div>
                    <div className="order-view flex">
                        <button onClick={()=>navigate(`/order/${props.data.OrderId}`)}>View Order</button>
                    </div>
                </div>
                <div className="order-box-section-2 flex-column">
                    {
                        props.data.Products?
                        props.data.Products.map((data,i)=>
                            <OrderProduct
                                key={i}
                                data={data}
                            />)
                        :null
                    }
                    
                </div>
            </div>
        </>
    )
}