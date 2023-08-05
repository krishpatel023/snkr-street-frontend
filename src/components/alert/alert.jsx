import './alert.css'

import { useEffect, useState } from 'react'

export default function Alert({message, type}) {
    const [show, setShow] = useState(false)
    useEffect(()=>{
        if(message){
            setShow(true)
            const myTimeout = setTimeout(eraseMsg, 5000);
        }
    },[message,type])
    const eraseMsg = async()=>{
        setShow(false)
    }
  return (
    <>
        {
            show? 
            <div className='alert-wrapper'>
        {
            type === "success" && show? 
            <div className="alert-box msg-success">
                <div className="alert-box-img">
                    <i className="fa-regular fa-circle-check"></i>
                </div>
                <div className="alert-box-msg">
                    <span>{message}</span>
                </div>
                <div className="alert-box-cross">
                    <button onClick={()=>{eraseMsg()}}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>  
                </div>
            </div>
            :null
        }
        {
            type === "warning" && show?
            <div className="alert-box msg-warning">
                <div className="alert-box-img">
                    <i className="fa-solid fa-triangle-exclamation"></i>
                </div>
                <div className="alert-box-msg">
                    <span>{message}</span>
                </div>
                <div className="alert-box-cross">
                    <button onClick={()=>{eraseMsg()}}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>  
                </div>
            </div>
            :null
        }
        {
            type === "error" && show? 
            <div className="alert-box msg-error">
                <div className="alert-box-img">
                    <i className="fa-solid fa-circle-exclamation"></i>
                </div>
                <div className="alert-box-msg">
                    <span>{message}</span>
                </div>
                <div className="alert-box-cross">
                    <button onClick={()=>{eraseMsg()}}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>  
                </div>
            </div>
            :null
        }
    </div>
    :null
    }
    </>
    
  )
}
