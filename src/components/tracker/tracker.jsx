import React, { useEffect } from 'react'
import './tracker.css'
export default function Tracker(props) {
    useEffect(()=>{
        if(props.stage >= 0){
          document.getElementById('tracker11').classList.add('tracker-active');
          document.getElementById('tracker12').classList.add('tracker-active');
        }
        if(props.stage >= 1){
          document.getElementById('tracker21').classList.add('tracker-active');
          document.getElementById('tracker22').classList.add('tracker-active');
          document.getElementById('tracker23').classList.add('tracker-active');
        }
        if(props.stage >= 2){
          document.getElementById('tracker31').classList.add('tracker-active');
          document.getElementById('tracker32').classList.add('tracker-active');
        }
    },[])
  return (

    <>
    {
      props.stage?

    
    <div className='tracker-wrapper flex-column'>
      <div className="tracker-box flex">
        <div className="circle flex" id="tracker11"><i className="fa-regular fa-note-sticky"></i></div>
        <div className="line-track" id="tracker12"></div>
        <div className="line-track" id="tracker21"></div>
        <div className="circle flex" id="tracker22"><i className="fa-solid fa-truck"></i></div>
        <div className="line-track" id="tracker23"></div>
        <div className="line-track" id="tracker31"></div>
        <div className="circle flex" id="tracker32"><i className="fa-solid fa-check fa-xl"></i></div>
      </div>
      <div className="tracker-name">
        <span>Order Placed</span>
        <span>In Transit</span>
        <span>Delivered</span>
      </div>
    </div>
    :null}
    </>

  )
}
