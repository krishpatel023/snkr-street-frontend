import './afterRegistration.css'
import myIMG from '../../assets/default_user.jpg'
import { useState, useEffect } from 'react'
import {useCookies} from 'react-cookie'
import { collection, addDoc ,query, where, getDocs} from 'firebase/firestore'
import { useNavigate } from "react-router-dom";
import { auth, storage} from '../../utils/firebase'
import {  ref, uploadBytes ,getDownloadURL } from 'firebase/storage'
import createRandom from '../../utils/createRandom'
import axios from 'axios'
import { config, backendURL } from '../../utils/utils';

export default function AfterRegistration(){

    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [uploadedImg, setUploadedImg] = useState()
    const [uploadedImgFile, setUploadedImgFile] = useState()
    const [firstName,setFirstName] = useState()
    const [Phone,setPhone] = useState()
    const [userId,setUserId] = useState()
    useEffect(()=>{
        if(cookies.userToken){
            setUserId(cookies.userToken)
            checkIfAlreadyExists(cookies.userToken)
        }
        else{
            navigate('/login')
        }
    },[]) 
    const checkIfAlreadyExists = async (myId)=>{
        try{
            const doesExist = await axios.get(`${backendURL}/api/users/checkIfAlreadyExists/${myId}`, config)
            console.log(doesExist.data)
            if(doesExist.data === true){
                navigate("/")
            }
        }catch(error){
            console.log(error)
        }  
    }
    const clickUpload = ()=>{
        document.getElementById('imageFile').click()
    }


    const imgupload = (img)=>{
       setUploadedImg(URL.createObjectURL(img))
    }

    const handleSubmit = async()=>{
        const imgId = createRandom(12)
        try{
            saveImgToDB(imgId)
            console.log(imgId, userId, firstName, auth.currentUser.email, Phone)
            await axios.post(`${backendURL}/api/users/createUser`, {
                userID: userId,
                name: firstName,
                email: auth.currentUser.email,
                img: imgId,
                phone: Phone,
                isAdmin: false
            },config);
            navigate(`/`)
        }catch(error){
            console.log(error)
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
    console.log("UID",userId)
    console.log(uploadedImg)
    return(
        <div className="after-registration-wrapper">

        
        <div className="after-registration-box secondary-bg">
                            <div className="change-user-back-btn">
                                <button onClick={()=>{setShowUserEdit(false)}}><i className="fa-solid fa-arrow-left-long fa-2xl"></i></button>                        
                            </div>
                            <div className="change-user-profile-pic">
                                <div className="after-registration-image-box">
                                    <div className="ar-image">

                                            <img src={uploadedImg? uploadedImg :myIMG} alt="" />
                                        
                                        
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
                                            <input className="field__input" type="text" id="address"  onChange={(e)=>{setFirstName(e.target.value)}}/>
                                        </label>
                                        <label className="field">
                                            <span className="field__label" htmlFor="address">Phone Number</span>
                                            <input className="field__input" type="text" id="address" onChange={(e)=>{setPhone(e.target.value)}}/>
                                        </label>
                                    </div>
                                    <div className="address-proceed-btn">
                                        <button className='button' onClick={()=>{handleSubmit()}}>SAVE CHANGES <i className="fa-solid fa-check"></i></button>
                                    </div>
                            </div>
                        </div>
                    </div>
                    </div>
    )
}