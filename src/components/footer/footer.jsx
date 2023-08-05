import './footer.css'
import Logo from '../../assets/logo-black.png'
import {Link} from 'react-router-dom'
export default function Footer() {
  return (
    <>
    <div className='footer-wrapper'>
        <div className="footer-section-1">
            <div className="footer-section-1-img">
                <img src={Logo} alt="" />
            </div>
            <div className="footer-section-1-para">
                <span>Our curated collection features iconic silhouettes, limited-edition collaborations, and the latest drops to elevate your style. Rest assured, every pair is 100% authentic, and our community celebrates the vibrant sneaker culture. Shop now and join the sneakerhead revolution!</span>
            </div>
            <div className="footer-social-section">
                <div className="footer-social-box">
                  <i className="fa-brands fa-facebook"></i>
                </div>
                <div className="footer-social-box">
                  <i className="fa-brands fa-instagram"></i>
                </div>
                <div className="footer-social-box">
                  <i className="fa-brands fa-youtube"></i>
                </div>
                <div className="footer-social-box">
                <i className="fa-solid fa-envelope"></i>
                </div>
            </div>
        </div>
        <div className="footer-section-2">
          <h2>OUR POLICIES</h2>
          <Link className='link-footer'>Privacy Policy</Link>
          <Link className='link-footer'>Shipping Policy</Link>
          <Link className='link-footer'>Returns and Refunds</Link>
          <Link className='link-footer'>Terms and Condition</Link>
          <Link className='link-footer'>Seller Policy</Link>
        </div>
        <div className="footer-section-3">
          <h2>PAYMENT METHODS AVAILABLE</h2>
          <div className="payment-methods-footer">
            <div className="payment-methods-box">
              <i className="fa-brands fa-cc-mastercard"></i>
            </div>
            <div className="payment-methods-box">
              <i className="fa-brands fa-cc-visa"></i>
            </div>
            <div className="payment-methods-box">
              <i className="fa-brands fa-paypal"></i>
            </div>
            <div className="payment-methods-box">
              <i className="fa-brands fa-google-pay"></i>
            </div>
          </div>
        </div>
    </div>
    <div className="footer-description">
      <h4>ALL RIGHTS RESERVED TO SNKR STREET</h4>
    </div>
    </>
  )
}
