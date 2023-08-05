import './allOrders.css'
import Header from '../../components/header/header'
import VerticalNavbar from '../../components/verticalNavbar/verticalNavbar'
import OrderBox from '../../components/order-box/orderBox'
import { config , backendURL} from '../../utils/utils'
import { useCookies } from 'react-cookie'
import { useState ,useEffect} from 'react'
import axios from 'axios'
export default function AllOrders(){
    // const dataBase = [1,2,3,4,5,6,7,8]

    const [cookies,setCookie,removeCookie] = useCookies([])
    const [dataBase,setDataBase] = useState()
    useEffect(()=>{
        if(cookies.userToken){
            getUserOrders(cookies.userToken)
        }
    },[])
    const getUserOrders = async(uid)=>{
        const data = await axios.get(`${backendURL}/api/orders/getAllOrdersOfUser/${uid}`, config)
        setDataBase(data.data)
    }
    return(
        <>
        <Header/>
        <div className="user-settings-wrapper background">
            <div className="user-settings-navbar">
                <VerticalNavbar
                    btn = {["ORDERS", "SETTINGS"]}
                    icon = {["fa-solid fa-boxes-packing","fa-solid fa-gear"]}
                    active = {"ORDERS"}
                    link = {["/allOrders", "/userSettings"]}
                />
            </div>
            <div className="user-settings-detail flex-column">
                <h1>ALL ORDERS</h1>
                <div className="user-setting-box scrollbar-vertical">
                    {
                        dataBase?
                        dataBase.map((data,i)=>
                        <div className="order-setting-order" key={i}>
                            <OrderBox
                                data={data}
                            />
                        </div>
                        )
                        :null
                    }
                </div>
            </div>
        </div>
        </>

    )
}