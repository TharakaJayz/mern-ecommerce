import React, { useState } from "react";
import "./Navbar.css";
import { BsCart } from "react-icons/bs";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
const Navbar = () => {
  const loggedUser = {
    // userName: localStorage.getItem("userName"),
    token: localStorage.getItem("userToken"),
    // userType:"admin",
    userType: localStorage.getItem("userType"),
  };
  const [cartLogic, setCartLogic] = useState(false);
  const [divFocusLogic, setDivFocusLogic] = useState(false);
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

  return (
    <div className="nav_main">
      <div className="nav_body">
        {loggedUser.token ? (
          <button
            className="nav_btn login"
            onClick={() => {
              localStorage.removeItem("userToken");
              localStorage.removeItem("userName");
              localStorage.removeItem("cartItems");
              localStorage.removeItem("userType");
              navigation("/");
              window.location.reload();
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

        {loggedUser.userType !== "admin" && (
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
  );
};

export default Navbar;
