import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { langs } from '../../langs/langs'

export default function Cart() {
    const {cart}=useSelector(state=>state.globalState)
    const {lang}=useSelector(state=>state)
  return (

    <div className='cart'>
       <div className="container">
       <div className="row">
           {cart.map((item,index)=>(
             <div key={index} className="col-lg-3 col-md-4 col-sm-6 col mb-3">
             <div className="card ">
               <img style={{height:"270px",objectFit:"cover"}} src={`${item.images.url}`} alt="" />
               <hr className='mt-1' />
               <div className="card-body">
               <p className='mb-1'><b>{langs[`${lang}`].title}</b>:{item[`title${lang}`]}</p>
               <p className='mb-1'><b>{langs[`${lang}`].price}</b>:{item.price}$</p>
               <p className='mb-1'><b>{langs[`${lang}`].category}</b>:{item[`category${lang}`]}</p>
               <p className='mb-1'><b>{langs[`${lang}`].description}</b>{item[`description${lang}`]}</p>
               </div>
             </div>
           </div>
           ))}
           
         </div>
       </div>
    </div>
  )
}
