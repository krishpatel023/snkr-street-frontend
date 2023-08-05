import './products.css'
import AdminHeader from '../../../components/header/adminHeader'
import VerticalNavbar from '../../../components/verticalNavbar/verticalNavbar'
import Table from '../../../components/table/table'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { useEffect, useState } from 'react'
import {backendURL, config } from '../../../utils/utils'
import { useCookies } from 'react-cookie'
export default function Products() {
    const [dataBase, setDataBase] = useState()
    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies()
    useEffect(()=>{
        if(cookies.userToken){
            getData()
            // verifyAdmin(cookies.userToken)
        }
        else{
            navigate('/login')
        }
    },[])
    const getData = async()=>{
        try{
            const data = await axios.get(`${backendURL}/api/products/`,config)
            setDataBase(data.data)
        }catch(err){
            console.error(err)
        }
    }
    console.log(dataBase)


    //VERIFY ADMIN
    const verifyAdmin = async(id)=>{
        try {
            const mydata = await axios.get(`${backendURL}/api/users/checkAdmin/${id}`,config)
            if(mydata.data === false){
                navigate('/')
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <>
    <AdminHeader/>
    <div className='products-wrapper'>
        <div className="products-navbar">
            <VerticalNavbar
                btn = {["ORDERS", "PRODUCTS"]}
                icon = {["fa-solid fa-boxes-packing","fa-solid fa-list"]}
                active = {"PRODUCTS"}
                link = {["/admin/orders","/admin/products"]}
            />
        </div>
        <div className="products-detail-section">
            <div className="products-add">
                <button onClick={()=>{navigate('/admin/createProduct')}}>ADD <i className="fa-solid fa-plus"></i></button>
            </div>
            <div className="product-table scrollbar-horizontal">
                <Table
                    heading = {["PRODUCT ID", "PRODUCT NAME", "PRICE", "ACTIONS"]}
                    dataBase = {dataBase}
                />
            </div>
        </div>
    </div>
    </>
  )
}
