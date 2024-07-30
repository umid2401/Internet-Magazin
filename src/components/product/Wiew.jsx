import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { globalTypes } from "../../redux/actions/globalTypes";
import { langs } from "../../langs/langs";
export default function Wiew() {
  const [product, setproduct] = useState({});
  const [relproduct, setrelproduct] = useState([]);
  const { id } = useParams();
  const { lang } = useSelector((state) => state);
  console.log(lang);
  const dispatch = useDispatch();
  useEffect(() => {
    getproduct();
  }, []);
  const getproduct = () => {
    dispatch({ type: globalTypes.isLoading, payLoad: true });
    axios
      .get("/api/products")
      .then((res) => {
        dispatch({ type: globalTypes.isLoading, payLoad: false });
        const myProduct = res.data.products.find(
          (item, index) => item._id === id
        );
        setproduct(myProduct);
        console.log(res.data.products);
        setrelproduct(
          res.data.products.filter(
            (item, index) => item.categoryUz === myProduct.categoryUz
          )
        );
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({ type: globalTypes.isLoading, payLoad: false });
      });
  };
  return (
    <div className="wiew">
      <div className="container py-5">
        <div className="row">
          <div className="col-md-5">
            <img
              className="w-100"
              src={product.images && product.images.url}
              alt=""
            />
          </div>
          <div className="col-md-5">
            <h2 className="mt-1">
              <b>{langs[`${lang}`].title}</b>:{product[`title${lang}`]}
            </h2>
            <p className="mt-1">
              <b>{langs[`${lang}`].category}</b>
              {product[`category${lang}`]}
            </p>
            <p className="mt-1">
              <b>{langs[`${lang}`].description}</b>
              {product[`description${lang}`]}
            </p>
            <p className="mt-1">
              <b>{langs[`${lang}`].content}</b>
              {product[`content${lang}`]}
            </p>
            <button className="btn btn-danger">Buy</button>
          </div>
        </div>
        <hr />
        <h2>Relocted Products</h2>
        <div className="row">
          {relproduct.map((item, index) => (
            <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-2">
              <div className="card h-100 position-relative">
                <img
                  src={item.images.url}
                  // className="card-img-top"
                  // alt="..."
                  // loading="lazy"
                  style={{ height: 320, objectFit: "cover" }}
                />
                <hr className="mt-0" />
                <div className="card-body pt-0 d-flex flex-column justify-content-between">
                  <div className="mb-2">
                    <h5 className="card-title">
                      {langs[`${lang}`].title}:
                      <span style={{ fontWeight: "400" }}>
                        {item[`title${lang}`]}
                      </span> 
                    </h5>
                    <p className="mb-1">
                      <b>{langs[`${lang}`].price}</b>:{item.price}$
                    </p>
                    <p className="mb-1">
                      <b>{langs[`${lang}`].category}</b>:
                      {item[`category${lang}`]}
                    </p>
                    <p className="mb-1">
                      <b>{langs[`${lang}`].description}</b>
                      {item[`description${lang}`]}
                    </p>
                  </div>
                  <div>
                    <div className="d-flex justify-content-between align-items-center">
                      <button className="btn btn-success w-100 ">Buy</button>
                      <Link
                        className="btn btn-primary d-block w-100 ms-3"
                        to=""
                      >
                        View
                      </Link>
                    </div>
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
