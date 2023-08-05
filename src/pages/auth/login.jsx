import { useState , useEffect} from "react"
import { useNavigate , Link} from "react-router-dom"
// import axios from 'axios'
import './login.css'
import { auth, googleProvider } from '../../utils/firebase'
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import {useCookies} from 'react-cookie'
function AuthMain(){
    const [Email, setEmail]=useState()
    const [Password, setPassword]=useState()
    const [Message, setMessage]=useState()

    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies([]);

    var userId = ''
    const config = {
      headers: {
        "Content-Type": "application/json"
        },
        withCredentials: true
      } 
    const handleSubmit = async ()=>{
        try{
            await signInWithEmailAndPassword(auth,Email,Password)
            userId = auth.currentUser.uid
            setCookie("userToken", userId)
            if(navigateAdmin === true){
                navigate('/admin/orders')
            }
            else{
                navigate('/')
            }
        }catch(error){
            const errorCode = error.code;
            setMessage(error.message)
        }
    }
    const handleGoogleSignIn = async()=>{
        try{
            await signInWithPopup(auth, googleProvider)
            userId = auth.currentUser.uid
            setCookie("userToken", userId)
            if(navigateAdmin === true){
                navigate('/admin/orders')
            }
            else{
                navigate('/')
            }
        }catch(error){
            setMessage(error.message)
        }
    } 

    const [demoEmail, setDemoEmail]=useState()
    const [demoPassword, setDemoPassword]=useState()
    const clickDemo = ()=>{
        setNavigateAdmin(false)
        setDemoEmail("demo@sneakerstreet.com")
        setDemoPassword("qwertyuiop")
        setEmail("demo@sneakerstreet.com")
        setPassword("qwertyuiop")
    }
    const clickAdmin = ()=>{
        setNavigateAdmin(true)
        setDemoEmail("admin@sneakerstreet.com")
        setDemoPassword("qwertyuiop")
        setEmail("admin@sneakerstreet.com")
        setPassword("qwertyuiop")
    }
    const [showBox,setShowBox] = useState(true)
    const [navigateAdmin, setNavigateAdmin] = useState(false)
    return(
        <>
        <div className="auth-wrapper-sec">
        <div className="auth-main-wrapper background">
            <div className="auth-main-box">
                <div className="auth-main-traditional">
                    <div className="login-box">
                        <h1>
                            {
                                navigateAdmin?
                                "ADMIN LOGIN"
                                :"LOGIN"
                            }
                        </h1>
                        <br />
                        <input type="email" placeholder='E-mail' defaultValue={demoEmail?demoEmail:null} onChange={(e)=>{setEmail(e.target.value);setMessage("")}}/>
                        <input type="password" placeholder='Password' defaultValue={demoPassword?demoPassword:null} onChange={(e)=>{setPassword(e.target.value)}}/>
                        <button onClick={()=>{handleSubmit()}}><h2>Login</h2></button>
                        <span>{Message?Message:null}</span>
                        <span>Don't have an account? <Link to='/signup' className="Link">Register</Link></span>
                    </div>
                </div>

                <div className="or-section">
                    <div className="slash-login"></div>
                    <div className="or-login"><h3>OR</h3></div>
                    <div className="slash-login"></div>
                </div>
                <div className="auth-main-google">
                    <div className="google-btn">
                        <button onClick={handleGoogleSignIn}><i className="fa-brands fa-google fa-2xl"></i><h3>Login Using Google</h3></button>
                    </div>
                </div>
            </div>
        </div>
        <div className="auth-main-demo-wrapper">
            {
                showBox?
                <div className="demo-box">
                    <div className="demo-box-x">
                        <button onClick={()=>{setShowBox(false)}}><i className="fa-solid fa-xmark"></i></button>
                    </div>
                    <div className="demo-account">
                        <span>Click For Accessing</span>
                        <button onClick={()=>{clickDemo()}}>DEMO ACCOUNT</button>
                    </div>
                    <div className="admin-account">
                        <span>Click For Accessing</span>
                        <button  onClick={()=>{clickAdmin()}}>ADMIN ACCOUNT</button>
                    </div>
                </div>
               :
               <div className="demo-circle">
                    <button onClick={()=>{setShowBox(true)}}><i className="fa-solid fa-bars"></i></button>
                </div>
            }
        </div>
        </div>
        </>
    )
}
export default AuthMain