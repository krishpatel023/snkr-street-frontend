import Header from "../../components/header/header"
import ProductCard from "../../components/product-card/productCard"
import './home.css'
import HeroImg from '../../assets/hero-img.png'
import Marquee from "../../components/marquee/marquee"
import AuthenticityImg from '../../assets/authenticity.png'
import Quality from '../../assets/quality.png'
import LowestRate from '../../assets/reduce-cost.png'
import Footer from "../../components/footer/footer"
import Alert from "../../components/alert/alert"
import { useState } from "react"
import { useNavigate } from "react-router"
import homeBanner from '../../assets/home-banner.jpg'
export default function Home(){
    const navigate = useNavigate()
    const [messageData, setMessage] = useState()
    const [msgType, setMsgType] = useState()
    const [email, setEmail] = useState()
    const clickSubscribe = ()=>{
        if(email){
            setMessage("YOU HAVE BEEN ADDED TO THE MAILING LIST")
            setMsgType("success")
        }
        else{
            setMessage("PLEASE ENTER A VALID E-MAIL ADDRESS")
            setMsgType("error")
        }

    }
    return( 
        <>
        <Header/>
        <Alert
            message={messageData}   
            type = {msgType}
        />
        <div className="home-wrapper background">    
            <div className="hero-section">
                <div className="hero-section-1">
                    <div className="hero-section-1-box">
                        <h1>Step into the World Of Sneakers</h1>
                        <h5>Discover Authentic, Rare & Premium Shoes From the World's Best Brands</h5>
                        <button onClick={()=>{navigate('/search')}}>
                            Shop Now <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
                <div className="hero-section-2">
                    <img src={HeroImg} alt="" />
                </div>
            </div>
            <div className="brand-section-111">
                <h1>BRANDS AVAILABLE</h1>
                <div className="home-marquee">
                    <Marquee/>
                </div>

            </div>
            <div className="offer-banner-section">
                <div className="offer-banner">
                    <div className="offer-banner-img">
                        <img src={homeBanner} alt="" />
                    </div>
                    <div className="offer-banner-text">
                        <span>LIMITED OFFER</span>
                        <h1>Get 35% Off this friday along with a special gift</h1>
                        <button>GRAB NOW <i className="fa-solid fa-arrow-right"></i></button>
                    </div>
                </div>
            </div>
            <div className="home-newsletter-section">
                <h1>Subscribe to our newsletter to get updates to our latest collections</h1>
                <span>Get 20% off on your first order just by subscribing to our newsletter.</span>
                <div className="newsletter-mailbox">
                    <div className="newsletter-mailbox-input">
                        <i className="fa-regular fa-envelope"></i>
                        <input type="email" placeholder="Enter Your Email" onChange={(e)=>{setEmail(e.target.value)}}/>
                    </div>
                    <div className="newsletter-mailbox-button">
                        <button onClick={()=>{clickSubscribe()}}>Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
}