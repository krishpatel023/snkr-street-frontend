import { useEffect } from 'react'
import './verticalNavbar.css'
import { useNavigate } from 'react-router'
export default function VerticalNavbar(props) {
    var element = ""
    const navigate = useNavigate()
    useEffect(() => {
        if(props.active){
            document.getElementById(props.active).classList.add("active-vertical");
        }
    },[])
  return (
    <>
    <div className="vertical-navbar-wrapper flex">
        <div className="vertical-navbar-box">
          {
              props.btn?
              props.btn.map((data,i)=>
              <div className="vertical-navbar-button" id={data} key={i}>
                  <div className="vertical-show"></div>
                  <button onClick={()=>{navigate(`${props.link[i]}`)}}>
                      <i className={props.icon[i]}></i>
                      {data}
                  </button>
              </div>)
              :null
          }
        </div>
    </div>
    </>
  )
}

