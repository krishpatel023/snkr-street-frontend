import Header from "../../components/header/header"
import ProductCard from "../../components/product-card/productCard"
import './home.css'
import HeroImg from '../../assets/hero-img.png'
import Marquee from "../../components/marquee/marquee"
import AuthenticityImg from '../../assets/authenticity.png'
import Quality from '../../assets/quality.png'
import LowestRate from '../../assets/reduce-cost.png'
import Footer from "../../components/footer/footer"
export default function Home(){
    return( 
        <>
        <Header/>
        <div className="home-wrapper background">    
            <div className="hero-section">
                <div className="hero-section-1">
                    <div className="hero-section-1-box">
                        <h1>Step into the World Of Sneakers</h1>
                        <h5>Discover Authentic, Rare & Premium Shoes From the World's Best Brands</h5>
                        <button>
                            Shop Now <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
                <div className="hero-section-2">
                    <img src={HeroImg} alt="" />
                </div>
            </div>
            <div className="brand-section">
                <h1>BRANDS AVAILABLE</h1>
                <Marquee/>
            </div>
            <div className="our-services">
                <div className="our-service-box">
                    <img src={AuthenticityImg} alt="" />
                    <h2>100% Authentic Products Only</h2>
                    <span>We ensure the Genuine Integrity of Every Product</span>
                </div>
                <div className="our-service-box">
                    <img src={Quality} alt="" />
                    <h2>Collection of Exclusively Rare Shoes.</h2>
                    <p>We search the entire market for Rare Shoes so you don't have to</p>
                </div>
                <div className="our-service-box">
                    <img src={LowestRate} alt="" />
                    <h2>Unbeatable rates that keep you coming back.</h2>
                    <p>We offer unbeatable rates to ensure customer satisfaction and loyalty.</p>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
}