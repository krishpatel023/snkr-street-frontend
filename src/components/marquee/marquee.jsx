import './marquee.css'

import React, { useEffect } from 'react'
import nike from '../../assets/nike.svg'
import jordan from '../../assets/jordan.svg'
import adidas from '../../assets/adidas.svg'
import converse from '../../assets/converse.svg'
// import newBalance from '../../assets/new-balance.svg'

import newBalance from '../../assets/nb.png'
export default function Marquee() {
    useEffect(()=>{
        marqueeRun()
    },[])

    const marqueeRun = async()=>{
        const root = document.documentElement;
        const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed");
        const marqueeContent = document.querySelector("ul.marquee-content");

        root.style.setProperty("--marquee-elements", marqueeContent.children.length);

        for(let i=0; i<marqueeElementsDisplayed; i++) {
        marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
        }
    }
  return (
    <div className='marquee-wrapper'>
          <div className="marquee">
            <ul className="marquee-content">
                <li><img src={nike} alt="" /></li>
                <li><img src={jordan} alt="" /></li>
                <li><img src={adidas} alt="" /></li>
                <li><img src={converse} alt="" /></li>
                <li><img src={newBalance} alt="" /></li>


            </ul>
        </div>
     </div>
  )
}
