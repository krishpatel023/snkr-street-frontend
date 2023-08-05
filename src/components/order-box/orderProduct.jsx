import './orderProduct.css'
import {currency, units} from '../../utils/utils'
import album from '../../assets/album.jpeg'
import ImageDoc from '../image/image'
import { useNavigate } from 'react-router'
function OrderProduct(props) {
    const navigate = useNavigate()
  return (
    <>
    {
        props.data ?
        <div className='order-product-wrapper'>
        <div className="order-product-image flex">
            <ImageDoc id={props.data.Image}/>
        </div>
        <div className="order-product-name flex-column">
            <h4>{props.data.Name}</h4>
            <h5>{currency} {props.data.Amount}</h5>
            <h5>QTY : {props.data.ProductQty}</h5>
            <h5>SIZE : {props.data.SelectedSize} { units }</h5>
        </div>
        <div className="order-product-review-section flex-column">
        {
            props.allowReview === true?
            <div className="order-product-review-btn">
                <button>WRITE A REVIEW</button>
            </div>
            :null
        }

            <div className="order-product-detail-btn">
                <button className=' btn-accent' onClick={()=>{navigate(`/product/${props.data.ProductId}`)}}>VIEW PRODUCT</button>
            </div>
        </div>
    </div>
    :null
    }
    </>
  )
}

export default OrderProduct
