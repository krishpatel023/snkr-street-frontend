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
        <div className="after-registration-wrapper background">
            <div className="after-registration-box">
                <div className="after-registration-image-section">
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
                <div className="after-registration-detail">
                    <input type="text" placeholder="First Name" onChange={(e)=>setFirstName(e.target.value)}/>
                    <input type="tel" placeholder="Phone Number" onChange={(e)=>setPhone(e.target.value)}/>
                </div>
                <div className="after-registration-btn">
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    )
}