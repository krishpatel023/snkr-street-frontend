import './search.css'
import Header from '../../components/header/header'
import ProductCard from '../../components/product-card/productCard'
import Filter from '../../components/filter/filter'
import { useEffect, useState } from 'react'
import { config , backendURL} from '../../utils/utils'
import axios from 'axios'
export default function Search(){
    const [dataBase, setDataBase] = useState()
    useEffect(()=>{
        getData()
    },[])
    const getData = async ()=>{
        const data = await axios.get(`${backendURL}/api/products/`,config)
        setDataBase(data.data)
    }
    // console.log(dataBase)


    // SEARCH FUNCTIONALITY

    const [query,setQuery]=useState()
    const getSearchedData = async()=>{
        let arr = query.split(" ")
        let sendingQry = arr.join("01010")
        if(query !== undefined){
            const data = await axios.get(`${backendURL}/api/products/search/${sendingQry}`,config)
            setDataBase(data.data)
        }
    }
    return(
        <>
            <Header/>
            <div className="search-wrapper background">
                <div className="search-section">
                    <div className="search-section-subsection">
                        <input type="text" placeholder='Search' onChange={(e)=>{setQuery(e.target.value)}}/>
                        <button onClick={()=>{getSearchedData()}}><i className="fa-solid fa-magnifying-glass fa-2xl"></i></button>
                    </div>
                </div>
                <div className="search-detail-section">
                    {/* <div className="search-category-section">
                        <Filter/>
                    </div> */}
                    <div className="search-product-section">
                        {
                            dataBase?
                            dataBase.map((data,i)=>
                                <ProductCard 
                                    key={i}
                                    data={data}
                                />
                            )
                            :null
                        }
                        <div className="empty-flex"></div>
                    </div>
                </div>
            </div>
        </>
    )
}