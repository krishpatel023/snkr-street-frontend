import './orders.css'
import { useEffect, useState } from 'react'
import AdminHeader from '../../../components/header/adminHeader'
import SideNav from '../../../components/verticalNavbar/verticalNavbar'
import axios from 'axios'
import { config,backendURL } from '../../../utils/utils'
import Table from '../../../components/order-table/table'
export default function Orders(){
    const [dataBase, setDataBase] = useState()
    useEffect(()=>{
        //0 - ALL
        //1 - ACTIVE
        //2 - DELIVERED
        getData(0)
    },[])
    const getData = async(id)=>{
        const data = await axios.get(`${backendURL}/api/orders/status/${id}`,config)
        setDataBase(data.data)
        changeActive(id)
    }
    const [prevActive,setPrevActive] = useState(0)
    const changeActive = async(id)=>{
        document.getElementById(`order-act-${prevActive}`).classList.remove('admin-order-active')
        document.getElementById(`order-act-${id}`).classList.add('admin-order-active')
        setPrevActive(id)
    }


    return(
        <>
            <div className="admin-orders-wrapper">
                <div className="admin-orders-header">
                    <AdminHeader/>
                </div>
                <div className="admin-order-sub-wrapper">
                    <div className="admin-orders-sidebar">
                        <SideNav 
                            btn = {["ORDERS", "PRODUCTS"]}
                            icon = {["fa-solid fa-boxes-packing","fa-solid fa-gear"]}
                            active = {"ORDERS"}
                            link = {["/admin/orders","/admin/products"]}
                        />
                    </div>
                    <div className="admin-order-main-wrapper">
                        <div className="admin-order-box-main">
                            <div className="admin-order-select-category">
                                    <button className='admin-order-active' id="order-act-0" onClick={()=>{getData(0)}}>ALL</button>
                                    <button id="order-act-1" onClick={()=>{getData(1)}}>ACTIVE</button>
                                    <button id="order-act-2" onClick={()=>{getData(2)}}>DELIVERED</button>
                            </div>
                            <div className="admin-order-table">
                                <Table
                                    heading = {["ORDER ID", "STATUS", "AMOUNT","MODE OF PAYMENT", "ACTIONS"]}
                                    dataBase = {dataBase}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}