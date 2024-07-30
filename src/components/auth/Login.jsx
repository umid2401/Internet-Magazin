import axios from "axios";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { globalTypes } from "../../redux/actions/globalTypes";
import { auth } from "../../redux/reducers/auth";

export default function Login() {
    const registerState = { email: "", password: "" };
    const [state, setState] = useState(registerState);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {auth}=useSelector(state=>state)
  const handelInput = (e) => {
    const {name,value}=e.target;
    setState({
      ...state, [name]:value,
    }
      )
    };
    
  const handelSubmit=(e)=>{
    dispatch({type:globalTypes.isLoading,payLoad:true})
    e.preventDefault();
    axios.post("/user/login",state).then(res=>{
      localStorage.setItem("isLogin",false);
      dispatch({type:globalTypes.addtocart,payLoad:res.data.user.cart}) 
      navigate("/")
      dispatch({type:globalTypes.isLoading,payLoad:false})
      toast.warn("Registred", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      dispatch({type:globalTypes.AUTH,payLoad:res.data})

    }).catch(err=>{
      console.log(err.response);
      toast.warn(err.response.data.msg  , {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        dispatch({type:globalTypes.isLoading,payLoad:false})
    })
  }
  useEffect(()=>{
    if(auth.user){
      navigate("/")
    }
  },[auth])
  return (
    <div className="Login">
      <div
        style={{ height: "100vh" }}
        className="d-flex align-items-center justify-content-center w-100"
      >
        <div className="row w-100">
          <div className="col-lg-4 offset-lg-4">
            <div className="card">
              <div className="card-header text-center">
                <h2>Login</h2>
              </div>
              <div className="card-body">
                <form onSubmit={handelSubmit}>
                  <input
                    type="email"
                    placeholder="Emailni kiriting..."
                    name="email"
                    className="form-control my-3"
                    onChange={handelInput}
                    value={state.email}
                  />
                  <input
                    type="password"
                    placeholder="Passwordni kiriting..."
                    name="password"
                    className="form-control my-3"
                    onChange={handelInput}
                    value={state.password}
                  />
                  <button type="submit" className="btn btn-primary d-block mx-auto my-3">
                    Login
                  </button>
                </form>
              </div>
              <div className="card-footer text-center">
                  <Link to="/register" className='text-decoration-none'>Dont't have an account .Register?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
