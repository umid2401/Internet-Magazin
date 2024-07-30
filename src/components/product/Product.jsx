import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { langs } from "../../langs/langs";
import { globalTypes } from "../../redux/actions/globalTypes";

export default function Product() {
  const dispatch = useDispatch();
  const { lang, products } = useSelector((state) => state);
  const { cart } = useSelector((state) => state.globalState);
  const [allproducts, setallproducts] = useState(products);
  const { auth } = useSelector((state) => state);
  const getproducts = () => {
    dispatch({ type: globalTypes.isLoading, payLoad: true });
    axios
      .get("/api/products")
      .then((res) => {
        dispatch({ type: "isLoading", payLoad: false });
        setallproducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "isLoading", payLoad: false });
      });
  };
  useEffect(() => {
    if (allproducts.length === 0) {
      getproducts();
    }
  }, [products]);
  const addTocart = (item) => {
    if (!auth.user) {
      toast.warning("Iltimos avval ro'yxatdan o'ting");
    } else {
      const myCart = cart;
      const isHave = myCart.findIndex((it, index) => it._id === item._id);
      if (isHave === -1) {
        item.quantity = 1;
        myCart.push(item);
      }
      axios
        .put(
          "/user/addCart",
          { cart },
          { headers: { Authorization: auth.accessToken } }
        )
        .then((res) => {
          dispatch({ type: globalTypes.addtocart, payLoad: myCart });
          console.log(cart);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };
  const addWiew = () => {
    axios
      .get("/api/product/:id", allproducts)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    setallproducts(products);
  }, [products]);

  return (
    <div className="product">
      <div className="container p-3">
        {allproducts.length === 0 && 
          (<div>
            <h1 className="text-center">No Products</h1>
          </div>
          )}

        <div className="row">
          {allproducts&&allproducts.map((item, index) => (
            <div key={index} className="col-lg-3 col-md-4 col-sm-6 col mb-3">
              <div className="card ">
                <img
                  style={{ height: "270px", objectFit: "cover" }}
                  src={`${item.images.url}`}
                  alt=""
                />
                <hr className="mt-1" />
                <div className="card-body">
                  <p className="mb-1">
                    <b>{langs[`${lang}`].title}</b>:{item[`title${lang}`]}
                  </p>
                  <p className="mb-1">
                    <b>{langs[`${lang}`].price}</b>:{item.price}$
                  </p>
                  <p className="mb-1">
                    <b>{langs[`${lang}`].category}</b>:{item[`category${lang}`]}
                  </p>
                  <p className="mb-1">
                    <b>{langs[`${lang}`].description}</b>
                    {item[`description${lang}`]}
                  </p>
                  <div className="d-flex">
                    <button
                      onClick={() => addTocart(item)}
                      className="btn d-block w-100  btn-warning"
                    >
                      Buy
                    </button>
                    <Link
                      to={`/wiew/${item._id}`}
                      className="btn d-block w-100 ms-3 btn-primary"
                    >
                      Wiew
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
        {allproducts.length&&<button onClick={()=>dispatch({ type: globalTypes.page} )} className="btn btn-dark">Load more</button>}  
        </div>
      </div>
    </div>
  );
}
