import './productCard.css'
import { currency } from "../../utils/utils"
import album from '../../assets/album.jpeg'
import {useNavigate} from 'react-router-dom'
import ImageDoc from '../../components/image/image'
export default function ProductCard({data}){
    const navigate = useNavigate()
    // console.log(data)
    return(
        <>
            {
                data?

            
            <button className="product-card-wrapper" onClick={()=>{navigate(`/product/${data.ProductId}`)}}>
                <div className="product-card-section-1">
                    <ImageDoc id={data.Image}/>
                </div>
                <div className="product-card-section-2">
                    <h1>{data.Name}</h1>
                    <h2>{currency} {data.Amount}</h2>
                    {/* <div className="product-card-color">
                            <button></button>
                            <button></button>
                            <button></button>
                    </div> */}
                    <div className="product-card-button">
                        <div className="button flex">View Detail</div>
                    </div>
                </div>
            </button>
            :null}
        </>
    )
}