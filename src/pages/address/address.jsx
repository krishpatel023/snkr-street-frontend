import './address.css'
import Header from '../../components/header/header'
import {currency} from '../../utils/utils'
import BillingAddress from '../../components/billing-address/billingAddress'
import { useNavigate } from 'react-router'

export default function Address(){
    const navigate = useNavigate()
    return(
        <>
            <Header/>
            <div className="address-wrapper background">
                <div className="address-box">
                    <div className="address-product-section">
                        <div className="address-product-box">
                            <div className="container">
                                <h1>Shipping</h1>
                                <p>Please enter your shipping details.</p>
                                <div className="form">
                                    
                                    <div className="fields fields--2">
                                        <label className="field">
                                        <span className="field__label" for="firstname">First name</span>
                                        <input className="field__input" type="text" id="firstname" value="John" />
                                        </label>
                                        <label className="field">
                                        <span className="field__label" for="lastname">Last name</span>
                                        <input className="field__input" type="text" id="lastname" value="Doe" />
                                        </label>
                                    </div>
                                    <label className="field">
                                        <span className="field__label" for="address">Address</span>
                                        <input className="field__input" type="text" id="address" />
                                    </label>
                                    <label className="field">
                                        <span className="field__label" for="country">Country</span>
                                        <select className="field__input" id="country">
                                        <option value=""></option>
                                        <option value="unitedstates">India</option>
                                        </select>
                                    </label>
                                    <div className="fields fields--3">
                                        <label className="field">
                                        <span className="field__label" for="zipcode">Zip code</span>
                                        <input className="field__input" type="text" id="zipcode" />
                                        </label>
                                        <label className="field">
                                        <span className="field__label" for="city">City</span>
                                        <input className="field__input" type="text" id="city" />
                                        </label>
                                        <label className="field">
                                        <span className="field__label" for="state">State</span>
                                        <input className="field__input" type="text" id="state" />
                                        </label>
                                    </div>
                                </div>
                                <div className="address-proceed-btn">
                                    <button className='button' onClick={()=>{navigate('/orderConfirmation')}}>Pay <i className="fa-solid fa-check"></i></button>
                                </div>
                            </div>
                            

                            </div>
                        </div>
                    
                    <div className="address-promo-section">
                        <div className="address-promo-box">
                            <h1>Bill Breakdown</h1>
                            <span><h5>Sub Total :</h5> <h5>{currency}20000</h5></span>
                            <span><h5>Shipping :</h5> <h5>{currency}0</h5></span>
                            <div className="slash"></div>
                            <span><h3>Total : </h3><h3>{currency}20000</h3></span>
                            <div className="slash"></div>   
                            <p>This is the final amount that is to be paid.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}