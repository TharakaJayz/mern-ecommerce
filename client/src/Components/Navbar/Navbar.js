import React, { useState } from "react";
import "./Navbar.css";
import { BsCart } from "react-icons/bs";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { GiShop } from "react-icons/gi";
import { jwtDecode } from "jwt-decode";
import ErrorCard from "../ErrorCard/ErrorCard";
const Navbar = () => {
  const loggedUser = {
    // userName: localStorage.getItem("userName"),
    token: localStorage.getItem("userToken"),
    // userType:"admin",
    userType: localStorage.getItem("userType"),
  };
  let loggerUserID;
  if (loggedUser.token) {
    loggerUserID = jwtDecode(loggedUser.token).userId;
  }
  // console.log("logger user id",loggerUserID)
  const [cartLogic, setCartLogic] = useState(false);
  const [loginErrorLogic, setLoginErroLogic] = useState(false);
  const navigation = useNavigate();

  let cartItem = useSelector((state) => state.cart);

  const cartHandler = () => {
    setCartLogic(!cartLogic);
    // console.log(cartItem);
  };

  const viewCartHandler = () => {
    if (cartItem.cartItems.length > 0) {
      navigation("/cart");
    }
  };

  const logOutBtnHandler = () => {
    setLoginErroLogic(true);
   
  };

  const loginErroCardHandler = (value) => {
    console.log("erro card callback",value);
    if(value.btn1){
      setLoginErroLogic(false);
    }

    if(value.btn2){
      localStorage.removeItem("userToken");
      localStorage.removeItem("userName");
      localStorage.removeItem("cartItems");
      localStorage.removeItem("userType");
      navigation("/");
      window.location.reload();
    }
  };
  return (
    <div className="nav_main">
      <div className="nav_body">
        <button className="nav_body_btn_home">
          {" "}
          <GiShop
            className="nav_body_btn_home_svg"
            onClick={() => {
              navigation("/");
              window.location.reload();
            }}
          />
        </button>
        <div className="nav_body_btn_wrapper">
          {loggedUser.token ? (
            <button
              className="nav_btn login"
              onClick={() => {
                logOutBtnHandler();
              }}
            >
              Logout
            </button>
          ) : (
            <button
              className="nav_btn login nav_buttton_class"
              onClick={() => {
                navigation("/login");
              }}
            >
              Login
            </button>
          )}

          {!loggedUser.token && (
            <button
              className="nav_btn signup"
              onClick={() => {
                navigation("/signUp");
              }}
            >
              Sign Up
            </button>
          )}
          {loggedUser.userType === "user" && (
            <button
              className="nav_btn signup"
              onClick={() => {
                navigation(`/orders/${loggerUserID}`);
              }}
            >
              My Orders
            </button>
          )}
          {loggedUser.userType === "admin" && (
            <button
              className="nav_btn signup"
              onClick={() => {
                navigation("/admin/orders");
              }}
            >
              Orders
            </button>
          )}

          {loggedUser.userType === "admin" && (
            <button
              className="nav_btn signup"
              onClick={() => {
                navigation("/admin");
              }}
            >
              Items
            </button>
          )}

          {loggedUser.userType === "user" && (
            <section className="nav_cart_sec" onClick={cartHandler}>
              <button className="nav_btn cart">
                {" "}
                <BsCart className="cart_svg" id="cart_svg" />
              </button>
              <span
                onBlur={() => {
                  setCartLogic(false);
                  console.log("this is working");
                }}
                id="cart_item_count"
              >
                {cartItem.cartItems.length}
              </span>
            </section>
          )}

          <div
            tabIndex="0"
            onBlur={() => {
              setCartLogic(false);
            }}
            className={cartLogic ? `cart_div` : `cart_div cart_hidden`}
          >
            {cartItem.cartItems.map((item) => {
              return (
                <section key={item.id} id="cartItem">
                  <span> {item.item} </span>
                  <span>{item.ORDQTY}</span>
                </section>
              );
            })}
            <section id="cart_item_price">{cartItem.totalPrice}</section>
            <button id="view_cart" onClick={viewCartHandler}>
              View Cart
            </button>
          </div>
        </div>
      </div>
      {loginErrorLogic && (

      <ErrorCard
        details={{
          message: "Are You sure you want to logout ?",
          btn1: [true, "Cancel","btn1_style"],
          btn2: [true, "Logout","btn2_style"],
        }}
        fn={loginErroCardHandler}
      />
      )}
    </div>
  );
};

export default Navbar;
