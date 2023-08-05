import { useNavigate } from 'react-router'
import Header from '../../components/header/header'
import OrderProduct from '../../components/order-box/orderProduct'
import Success from '../../components/success-animation/success'
import './orderConfirmation.css'
export default function OrderConfirmation() {
const navigate = useNavigate()
  return (

    <>
    <Header/>
    <div className='order-confirmation-wrapper background'>
        <div className="order-confirmation-box secondary-bg">
            <div className="order-confirmation-section-1 flex">
                <Success/>
            </div>
            <div className="order-confirmation-section-2">
            <br />
                <h2>Your order has been placed!</h2><br />
                <span>You can track the order from your orders section.</span>
            </div>
            {/* <div className="order-confirmation-section-3">
                <h3>Transaction Date</h3>
                <span>23 08 21</span>
            </div>
            <div className="order-confirmation-section-4">
                <h3>Payment Method</h3>
                <span>Cash on Delivery</span>   
            </div> */}
                <div className="order-confirmation-btn">
                    <button className='button' onClick={()=>{navigate('/products')}}>Continue Shopping</button>
                </div>
        </div>
    </div> 
    </>

  )
}
