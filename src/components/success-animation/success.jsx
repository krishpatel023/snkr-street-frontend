import React from 'react'
import './success.css'
export default function Success(props) {
  return (
    <div className='success-animation'>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="checkmark"
            viewBox="0 0 52 52"
            {...props}
        >
            <circle cx={26} cy={26} r={25} fill="none" className="checkmark__circle" />
            <path
            fill="none"
            d="m14.1 27.2 7.1 7.2 16.7-16.8"
            className="checkmark__check"
            />
        </svg>
    </div>
  )
}
