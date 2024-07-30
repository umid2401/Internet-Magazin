import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Product from './components/product/Product'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { globalTypes } from './redux/actions/globalTypes'
import Loading from './components/Loading'
import Cart from './components/product/Cart'
import Wiew from './components/product/Wiew'
import History from './components/history/History'


export default function App() {
  const {auth}=useSelector(state=>state)
  const {isLoading}=useSelector(state=>state)
  // const navigate=useNavigate()
  const dispatch=useDispatch();
  useEffect(()=>{
    // dispatch({type:globalTypes.isLoading,payLoad:true})
    if(localStorage.getItem("isLogin")){
      dispatch({type:globalTypes.isLoading,payLoad:false})
      axios.get("/user/refresh_token").then(res=>{
        // navigate("/")
        dispatch({type:globalTypes.AUTH,payLoad:res.data})
        dispatch({type:globalTypes.isLoading,payLoad:false})
        dispatch({type:globalTypes.addtocart,payLoad:res.data.user.cart})
      }).catch(err=>{
        console.log(err)
        dispatch({type:globalTypes.isLoading,payLoad:false})
      })
    }
  },[])
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      {isLoading&&<Loading/>}
      
      <Routes>
        <Route path="/product" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/wiew/:id" element={<Wiew />} />
        <Route path="/register" element={<Register />} />
        <Route path="/history" element={<History />} />
      </Routes>
      <Footer/>
  
    </div>
  )
}


