import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const registerState = { name: "", email: "", password: "" };
  const [state, setState] = useState(registerState);
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const handelInput = (e) => {
    const {name,value}=e.target;
    setState({
      ...state, [name]:value,
    }
      )
  };
  const handelSubmit=(e)=>{
    dispatch({type:"isLoading",payLoad:true})
    e.preventDefault();
    axios.post("user/register",state).then(res=>{
      console.log(res);
      navigate("/login")
      dispatch({type:"isLoading",payLoad:false})
    }).catch(err=>{
      console.log(err.response);

      dispatch({type:"isLoading",payLoad:false})
    })
  }
  return (
    <div className="register ">
      {console.log(state)}
      <div
        style={{ height: "100vh" }}
        className="d-flex align-items-center justify-content-center w-100 "
      >
        <div className="row w-100  ">
          <div className="col-lg-4 offset-lg-4 ">
            <div className="card">
              <div className="card-header text-center">
                <h2>Sign Up</h2>
              </div>
              <div className="card-body">
                <form onSubmit={handelSubmit}>
                  <input
                    type="text"
                    placeholder="Enter your name..."
                    className="form-control"
                    name="name"
                    value={state.name}
                    onChange={handelInput}
                  />
                  <input
                    type="email"
                    placeholder="Enter your email..."
                    className="form-control my-3"
                    name="email"
                    value={state.email}
                    onChange={handelInput}
                  />
                  <input
                    type="password"
                    placeholder="Enter your password..."
                    className="form-control"
                    name="password"
                    value={state.password}
                    onChange={handelInput}
                  />
                  <button
                    type="submit"
                    className="btn btn-warning mx-auto d-block my-3"
                  >
                    Register
                  </button>
                </form>
              </div>
              <div className="card-footer text-center">
                <Link to="/login" className='text-decoration-none'>
                  All ready an account. Login?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
