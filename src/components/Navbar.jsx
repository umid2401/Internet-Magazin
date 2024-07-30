import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { langs } from "../langs/langs";
import { globalTypes } from "../redux/actions/globalTypes";
import { auth } from "../redux/reducers/auth";

export default function Navbar() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [category1, setCategory1] = useState({});
  const [mysort, setmysort] = useState("-createAt");
  const [search, setsearch] = useState("");
  const { lang, auth, category } = useSelector((state) => state);
  const { cart, page } = useSelector((state) => state.globalState);
  const handelSelect = (e) => {
    dispatch({ type: globalTypes.lang, payLoad: e.target.value });
  };
  const Logout = () => {
    dispatch({ type: globalTypes.AUTH, payLoad: {} });
    dispatch({ type: globalTypes.addtocart, payLoad: [] });
    localStorage.clear("isLogin");
    console.log(auth);
  };
  const handelselect = (e) => {
    getsetproducts(e.target.value);
  };
  const handleCategory1 = (e) => {
    axios
      .get("/api/category")
      .then((res) => {
        console.log(res.data);
        setCategory1(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  useEffect(() => {
    handleCategory1();
  }, []);
  const getsetproducts = (sort) => {
    dispatch({ type: globalTypes.isLoading, payLoad: true });
    console.log(search);
    setmysort(sort);
    // setCategory1(category)
    axios
      .get(
        `/api/products?limit=${
          page * 2
        }&sort=${sort}&[title${lang}][regex]=${search}&[category${lang}]=${category}`
      )
      .then((res) => {
        console.log(res);
        dispatch({ type: "isLoading", payLoad: false });
        dispatch({ type: "products", payLoad: res.data.products });
      })
      .catch((err) => {
        dispatch({ type: "isLoading", payLoad: false });
        console.log(err.response);
      });
  };
  const searchProduct = () => {
    // getsetproducts(mysort)
    dispatch({ type: globalTypes.isLoading, payLoad: true });
    axios
      .get(`/api/products?[title${lang}][regex]=${search}`)
      .then((res) => {
        console.log(res);
        dispatch({ type: "isLoading", payLoad: false });
        dispatch({ type: "products", payLoad: res.data.products });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({ type: "isLoading", payLoad: false });
      });
  };
  const handelCategory = (e) => {
    dispatch({ type: globalTypes.category, payLoad: e.target.value });
    getsetproducts(mysort);
    console.log(category);
  };
  useEffect(() => {
    if (page !== 1) {
      getsetproducts();
    }
  }, [page]);
  useEffect(() => {
    getsetproducts(mysort);
  }, [category]);
  return (
    <div className="Navbar">
      <div className="myNavbar">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand" to="/">
              {langs[`${lang}`].navbar}
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/product" className="text-decoration-none nav-link">
                    {langs[`${lang}`].product}
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link to="/products" className="text-decoration-none nav-link">
                    {langs[`${lang}`].product}
                  </Link>
                </li> */}
                <li className="nav-item">
                  <Link className="text-decoration-none nav-link" to="/history">
                    History
                  </Link>
                </li>
              </ul>
              <div className="d-flex align-items-center me-2">
                {auth.user && (
                  <Link
                    className="btn btn-info me-3 position-relative p-0"
                    to="/cart"
                  >
                    <img
                      className="me-3"
                      style={{ width: "30px" }}
                      src="https://thinkpoint.pl/img/cms/wybierz_towar.png"
                      alt=""
                    />
                    <span
                      style={{ top: "-5px", left: "35px" }}
                      className="badge bg-primary position-absolute "
                    >
                      {auth.user && auth.user.cart.length}
                    </span>
                  </Link>
                )}

                {!auth.user && (
                  <Link
                    className="text-decoration-none text-nowrap nav-link text-white "
                    to="/login"
                  >
                    {langs[`${lang}`].login}
                  </Link>
                )}

                <select className="form-select me-2" onChange={handelSelect}>
                  <option value="Uz">Uz</option>
                  <option value="Eng">Eng</option>
                </select>
                {auth.user && (
                  <button onClick={Logout} className=" btn-danger btn">
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div className="container py-3 ">
        <div className="salom">
          <div className="d-flex align-items-center">
            <h4 className="m-0 me-1">Filter:</h4>

            <select
              value={category}
              onChange={handelCategory}
              className="form-select me-2 w-25"
            >
              {category1.length &&
                category1.map((item, index) => (
                  <option key={index} value={item[`name${lang}`]}>
                    {item[`name${lang}`]}
                  </option>
                ))}
            </select>
            <form className=" form-control d-flex  border-0 mx-lg-3 mb-lg-0 mb-2">
              <input
                onChange={(e) => setsearch(e.target.value)}
                type="search"
                className="form-control me-2"
                placeholder="Search..."
              />
              <button
                type="button"
                onClick={(mysort) => searchProduct(mysort)}
                className="btn btn-warning"
              >
                Search
              </button>
            </form>
            <h4 className="m-0 me-1">Sort:</h4>
            <select onChange={handelselect} className="form-select w-25">
              <option value="-createAt">{langs[`${lang}`].new}</option>
              <option value="createAt">{langs[`${lang}`].old}</option>
              <option value="-sold">{langs[`${lang}`].best}</option>
              <option value="price">{langs[`${lang}`].low}</option>
              <option value="-price">{langs[`${lang}`].high}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
