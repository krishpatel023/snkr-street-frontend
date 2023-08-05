import './allOrders.css'
import './accountSettings.css'
import Header from '../../components/header/header'
import VerticalNavbar from '../../components/verticalNavbar/verticalNavbar'
import OrderBox from '../../components/order-box/orderBox'
import { config , backendURL} from '../../utils/utils'
import { useCookies } from 'react-cookie'
import { useState ,useEffect} from 'react'
import axios from 'axios'
import Image from '../../components/image/userImage'
import createRandom from '../../utils/createRandom'
import myIMG from '../../assets/default_user.jpg'
import {  ref, uploadBytes ,getDownloadURL } from 'firebase/storage'
import { storage} from '../../utils/firebase'
import Alert from '../../components/alert/alert'
import { useNavigate } from 'react-router'
export default function AccountSettings(){

    //ALERT
    const [messageData, setMessage] = useState()
    const [msgType, setMsgType] = useState()
    // const dataBase = [1,2,3,4,5,6,7,8]

    const [cookies,setCookie,removeCookie] = useCookies([])
    const [dataBase,setDataBase] = useState()
    const [showUserEdit, setShowUserEdit] = useState(false)
    const [addresses, setAddresses] = useState()

    // ADDRESS
    const [title, setTitle] = useState()
    const [street, setStreet] = useState()
    const [area , setArea ] = useState()
    const [city , setCity] = useState()
    const [state, setState] = useState()
    const [pinCode, setPinCode] = useState()
    // ADDRESS SHOW
    const [showAddress, setShowAddress] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState(-1)

    const navigate = useNavigate()
    useEffect(()=>{
        if(cookies.userToken){
            getUserInfo(cookies.userToken)
            getAddresses(cookies.userToken)
        }
        else{
            navigate('/login')
        }
    },[])
    const getUserInfo = async(uid)=>{
        const data = await axios.get(`${backendURL}/api/users/${uid}`, config)
        setDataBase(data.data)
        setPhone(data.data.phone)
        setName(data.data.name)
    }
    

    const getAddresses = async(id)=>{
        const data = await axios.get(`${backendURL}/api/address/${id}`,config)
        setAddresses(data.data)
    }
    const editAddress = async(AID)=>{
        try {
            await axios.put(`${backendURL}/api/address/editAddress/${AID}`, {
                AddressId : AID,
                Title : title,
                Street : street,
                Area : area,
                City : city,
                State : state,
                Pincode : pinCode
            },config)
            setMessage("YOUR ADDRESS HAS BEEN EDITED")
            setMsgType("success")
            getAddresses(cookies.userToken)
            setShowAddress(false)            
        } catch (error) {
            setMessage("AN ERROR OCCURED: PLEASE TRY AGAIN")
            setMsgType("error")
        }

    }
    const deleteAddress = async(AID)=>{
        try {
            await axios.delete(`${backendURL}/api/address/${AID}/${cookies.userToken}`,config)
            setShowAddress(false)   
            setMessage("YOUR ADDRESS HAS BEEN DELETED")
            setMsgType("success")         
        } catch (error) {
            setMessage("AN ERROR OCCURED: PLEASE TRY AGAIN")
            setMsgType("error")
        }

    }
    useEffect(()=>{
        if(selectedAddress !== -1){
            setTitle(addresses[selectedAddress].Title)
            setStreet(addresses[selectedAddress].Street)
            setArea(addresses[selectedAddress].Area)
            setCity(addresses[selectedAddress].City)
            setState(addresses[selectedAddress].State)
            setPinCode(addresses[selectedAddress].Pincode)
        }

    },[selectedAddress])

    // IMG PURPOSE

    const [uploadedImg, setUploadedImg] = useState()
    const [uploadedImgFile, setUploadedImgFile] = useState()
    const [name, setName] = useState()
    const [phone, setPhone] = useState()

    const clickUpload = ()=>{
        document.getElementById('imageFile').click()
    }


    const imgupload = (img)=>{
       setUploadedImg(URL.createObjectURL(img))
    }

    const handleSubmit = async()=>{
        if(uploadedImg === undefined){
            try{
                await axios.put(`${backendURL}/api/users/${dataBase.userID}`, {
                    name: name,
                    phone: phone
                },config);
                setMessage("YOUR DATA HAS BEEN UPDATED")
                setMsgType("success")
                getUserInfo(cookies.userToken)
                setShowUserEdit(false)
            }catch(error){
                setMessage("AN ERROR OCCURED: PLEASE TRY AGAIN")
                setMsgType("error")
                console.log(error)
            }
        }
        else{
            const imgId = createRandom(12)
            try{
                saveImgToDB(imgId)
                await axios.put(`${backendURL}/api/users/${dataBase.userID}`, {
                    name: name,
                    img: imgId,
                    phone: phone
                },config);
                setMessage("YOUR DATA HAS BEEN UPDATED")
                setMsgType("success")
                showUserEdit(false)
                getUserInfo(cookies.userToken)
                navigate(`/userSettings`)
            }catch(error){
                setMessage("AN ERROR OCCURED: PLEASE TRY AGAIN")
                setMsgType("error")
                console.log(error)
            }
        }
    }
    const saveImgToDB = async(fileName)=>{
        try{
            if (!uploadedImgFile) return;

            const imageRef = ref(storage, `userImg/${fileName}`);
        
            uploadBytes(imageRef, uploadedImgFile).then((snapshot) => {
                console.log(snapshot.ref)
            });
        }
        catch(error){
            console.log(error)
        }
    }
    return(
        <>

        <Header/>
        <div className="user-settings-wrapper background">
            <Alert
                message={messageData}   
                type = {msgType}
            />
            <div className="user-settings-navbar">
                <VerticalNavbar
                    btn = {["ORDERS", "SETTINGS"]}
                    icon = {["fa-solid fa-boxes-packing","fa-solid fa-gear"]}
                    active = {"SETTINGS"}
                    link = {["/allOrders", "/userSettings"]}
                />
            </div>
            <div className="user-settings-detail flex-column">
                {
                    dataBase && (showAddress === false) && (showUserEdit === false)?
                    <div className="account-settings-box secondary-bg">
                        <div className="account-information">
                            <div className="account-information-img">
                                <Image id={dataBase.img}/>
                            </div>
                            <div className="account-information-info">
                                <h4>{dataBase.name}</h4><br />
                                <span>{dataBase.email}</span><br />
                                <span>{dataBase.phone}</span><br />
                                <button onClick={()=>{setShowUserEdit(true)}}>EDIT <i className="fa-solid fa-pen-to-square"></i></button>
                            </div>
                        </div>
                        <div className="account-addresses">
                        <h1>Saved Addresses</h1>
                        <div className="order-address-section scrollbar-horizontal">
                            {   
                                addresses?
                                addresses.map((data,i)=>
                                <button className="order-address-box-new" id={`address-${i}`} key={i} onClick={()=>{setSelectedAddress(i);setShowAddress(true)}}> 
                                    <h4>{data.Title}</h4><br />
                                    <span>{data.Street}</span><br />
                                    <span>{data.Area}</span><br />
                                    <span>{data.City}</span><br />
                                    <span>{data.State}</span><br />
                                    <span>{data.Pincode}</span><br />
                                    <span name='edit-btn'>EDIT <i className="fa-solid fa-pen-to-square"></i></span>
                                </button>
                                )
                                :null
                            }

                            {/* <button className="order-address-add-btn" onClick={()=>{setShowAddress(true);setError()}}><i className="fa-solid fa-plus fa-2xl"></i></button> */}
                        </div>
                        </div>
                    </div>
                    :null
                }
                {
                    showAddress?
                    <div className="change-address-box secondary-bg">
                    <div className="change-address-back-btn">
                    <button onClick={()=>{setShowAddress(false)}}>
                    <i className="fa-solid fa-arrow-left-long fa-2xl"></i>
                    </button>                        
                    </div>

                    <div className="change-address-sec-box">
                    <div className="form">
                                    <label className="field">
                                        <span className="field__label" htmlFor="address">Title</span>
                                        <input className="field__input" type="text" id="address" defaultValue={title}  onChange={(e)=>{setTitle(e.target.value)}}/>
                                    </label>
                                    <label className="field">
                                        <span className="field__label" htmlFor="address">Address</span>
                                        <input className="field__input" type="text" id="address" defaultValue={street} onChange={(e)=>{setStreet(e.target.value)}}/>
                                    </label>
                                    <label className="field">
                                        <span className="field__label" htmlFor="address">Area</span>
                                        <input className="field__input" type="text" id="address" defaultValue={area} onChange={(e)=>{setArea(e.target.value)}}/>
                                    </label>
                                    <div className="fields fields--3">
                                        <label className="field">
                                        <span className="field__label" htmlFor="zipcode">Zip code</span>
                                        <input className="field__input" type="text" id="zipcode" defaultValue={pinCode} onChange={(e)=>{setPinCode(e.target.value)}}/>
                                        </label>
                                        <label className="field">
                                        <span className="field__label" htmlFor="city">City</span>
                                        <input className="field__input" type="text" id="city" defaultValue={city} onChange={(e)=>{setCity(e.target.value)}}/>
                                        </label>
                                        <label className="field">
                                        <span className="field__label" htmlFor="state">State</span>
                                        <input className="field__input" type="text" id="state" defaultValue={state} onChange={(e)=>{setState(e.target.value)}}/>
                                        </label>
                                    </div>
                                </div>
                                <div className="address-proceed-section">
                                    <div className="address-proceed-btn btn-green">
                                        <button className='button ' onClick={()=>{editAddress(addresses[selectedAddress].AddressId)}}>SAVE CHANGES <i className="fa-solid fa-check"></i></button>
                                    </div>
                                    <div className="address-proceed-btn btn-red">
                                        <button className='button ' onClick={()=>{deleteAddress(addresses[selectedAddress].AddressId)}}>DELETE ADDRESS <i className="fa-solid fa-trash"></i></button>
                                    </div>                                    
                                </div>

                    </div>
                    
                    </div>
                    :null
                }
                {
                    showUserEdit?
                    <div className="change-settings-user-box secondary-bg">
                            <div className="change-user-back-btn">
                                <button onClick={()=>{setShowUserEdit(false)}}><i className="fa-solid fa-arrow-left-long fa-2xl"></i></button>                        
                            </div>
                            <div className="change-user-profile-pic">
                                <div className="after-registration-image-box">
                                    <div className="ar-image">
                                        {
                                            uploadedImg?
                                            <img src={uploadedImg? uploadedImg :myIMG} alt="" />
                                            :
                                            <Image id={dataBase.img}/>
                                        }
                                        
                                        <input type="file" accept="image/*" id='imageFile' onChange={(e)=>{imgupload(e.target.files[0]);setUploadedImgFile(e.target.files[0])}}/>
                                    </div>
                                    <div className="ar-button">
                                        <button onClick={clickUpload}><i className="fa-solid fa-camera fa-2xl"></i></button>
                                    </div>
                                </div>
                            </div>
                        <div className="change-settings-user-sec-box">

                            <div className="change-user-sec-box">
                                    <div className="form">
                                        <label className="field">
                                            <span className="field__label" htmlFor="address">Name</span>
                                            <input className="field__input" type="text" id="address" defaultValue={name}  onChange={(e)=>{setName(e.target.value)}}/>
                                        </label>
                                        <label className="field">
                                            <span className="field__label" htmlFor="address">Phone Number</span>
                                            <input className="field__input" type="text" id="address" defaultValue={phone} onChange={(e)=>{setPhone(e.target.value)}}/>
                                        </label>
                                    </div>
                                    <div className="address-proceed-btn">
                                        <button className='button' onClick={()=>{handleSubmit()}}>SAVE CHANGES <i className="fa-solid fa-check"></i></button>
                                    </div>
                            </div>
                        </div>
                    </div>
                    :null
                }
            </div>
        </div>
        </>

    )
}