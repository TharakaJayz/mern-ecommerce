import React, { useEffect, useState } from "react";
import "./ViewCart.css";
import Navbar from "../../Components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { cartActions } from "../../Store/Cart-slice";
import { useNavigate } from "react-router";
import ErrorCard from "../../Components/ErrorCard/ErrorCard";
import axios from "axios";
const ViewCart = () => {
  const [erroLogic, setErrorLogic] = useState(false);
  const [erroLogic2, setErrorLogic2] = useState(false);

  const [items, setItems] = useState([]);
  const loggedUser = {
    userName: localStorage.getItem("userName"),
    token: localStorage.getItem("userToken"),
    cartItems: JSON.parse(localStorage.getItem("cartItems")),
  };
  let cartItems = useSelector((state) => state.cart);
  useEffect(() => {
    if (loggedUser.token) {
      // console.log(
      //   "logged user cart details",
      //   localStorage.getItem("cartItems")
      // );

      if (localStorage.getItem("cartItems")) {
        localStorage.removeItem("cartItems");
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      }

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      // console.log("items from hardcoded", items);
    }
  }, [cartItems]);

  useEffect(() => {
    const getItems = async () => {
      try {
        const itemsFromBackend = await axios.get(
          "http://localhost:8080/product/all_products"
        );
        // console.log("items in DB", itemsFromBackend.data);
        setItems(itemsFromBackend.data.details);
        return itemsFromBackend.data.details;
      } catch (err) {
        // console.log("item fetching error", err);
        return [];
      }
    };

    getItems();
  }, []);

  const navigatoin = useNavigate();

  const dispatch = useDispatch();
  const increaseHandler = (value) => {
    dispatch(
      cartActions.addToCart({
        item: value.item,
        price: parseInt(value.price),
        qty: parseInt(value.qty),
        id: value.id,
        ORDQTY: value.ORDQTY,
      })
    );
  };
  const decreaseHandler = (value) => {
    dispatch(
      cartActions.removeFromCart({
        id: value.id,
        price: parseInt(value.price),
        ORDQTY: value.ORDQTY,
      })
    );
  };

  const deleteButtonHandler = (value) => {
    dispatch(
      cartActions.dropFromCart({
        id: value.id,
        price: value.price,
        ORDQTY: value.ORDQTY,
      })
    );
    // console.log("dispatching value", value);
  };
  const placeOrderHandler = async () => {
    if (!loggedUser.token) {
      // eror that should be tell to log into site
      setErrorLogic(true);
    }
    setErrorLogic2(true);
  };

  const diplayCardHandler = (value) => {
    // console.log(value)
    if (value.btn1) {
      navigatoin("/login");
    }
    if (value.btn2) {
      navigatoin("/signUp");
    }
  };

  const diplayCardHandler2 = async (value) => {
    if (value.btn1) {
      try {
        const orderRespond = await axios.post(
          "http://localhost:8080/order/new_order",
          {
            userEmail: loggedUser.userName,
            orderItems: cartItems.cartItems.map((ordItem) => {
              return { id: ordItem.id, ordqty: parseInt(ordItem.ORDQTY) };
            }),
            deliverId: 1,
          },
          {
            headers: {
              Authorization: "Bearer " + loggedUser.token,
            },
          }
        );

        console.log("respond from adding order", orderRespond);
      } catch (err) {
        console.log("error when creating order", err);
        return;
      }
      localStorage.removeItem("cartItems");
      localStorage.setItem(
        "cartItems",
        JSON.stringify({
          cartItems: [],
          totalItems: 0,
          totalPrice: 0,
        })
      );
      dispatch(cartActions.deleteCart());
      navigatoin("/");
      window.location.reload();
    }

    if (value.btn2) {
      setErrorLogic2(false);
    }
  };
  return (
    <div className="viewCart_main">
      <Navbar />

      <div className="viewCart_body">
        <div className="VC_body_left">
          {/* {console.log("comparing arrays", "array1", cartItems.cartItems)} */}
          {/* {console.log("comparing arrays", "array2", items)} */}
          {cartItems.cartItems.map((cartItem) => {
            return items.map((item) => {
              if (item._id + "" === cartItem.id) {
                return (
                  <div className="VC_item" key={item._id}>
                    <section className="Item_sec-1">
                      <section className="IT_Sec-1_left">
                        <img src={item.imageUrl} alt="item" />
                      </section>
                      <section className="IT_Sec-1_right">
                        <h4>{item.title}</h4>
                        <h5>{item.brand} </h5>
                        <h5> {item.quantity} item(s) in stock</h5>
                      </section>
                    </section>
                    <section className="Item_sec-2">
                      <section className="IT_Sec-2_left">
                        <h3>RS. {item.price} </h3>
                        <button
                          onClick={() => {
                            deleteButtonHandler({
                              id: item._id.toString(),
                              price: item.price,
                              ORDQTY: cartItem.ORDQTY,
                            });
                          }}
                        >
                          {" "}
                          <MdDelete id="dlete_svg" />{" "}
                        </button>
                      </section>
                      <section className="IT_Sec-2-right">
                        <button
                          onClick={() => {
                            decreaseHandler({
                              id: item._id.toString(),
                              price: item.price,
                              ORDQTY: cartItem.ORDQTY,
                            });
                          }}
                        >
                          -
                        </button>
                        <span> {cartItem.ORDQTY}</span>
                        <button
                          onClick={() => {
                            increaseHandler({
                              item: item.description,
                              price: item.price,
                              qty: item.quantity,
                              id: item._id.toString(),
                              ORDQTY: cartItem.ORDQTY,
                            });
                          }}
                        >
                          +
                        </button>
                      </section>
                    </section>
                  </div>
                );
              }
            });
          })}
        </div>
        <div className="VC_body_right">
          <h3>Order Summery</h3>
          <section>
            <span>Subtotal ( {cartItems.totalItems} items) </span>
            <span>RS. {cartItems.totalPrice}</span>
          </section>
          <section>
            <span>Total </span>
            <span id="Total_price">RS. {cartItems.totalPrice}</span>
          </section>
          <button
            onClick={() => {
              placeOrderHandler();
            }}
          >
            Place The Order
          </button>
        </div>
      </div>
      {erroLogic && (
        <ErrorCard
          details={{
            message: "You Have To SignIn/SignUp Before Place an Order",
            btn1: [true, "SignIn"],
            btn2: [true, "SignUp"],
          }}
          fn={diplayCardHandler}
        />
      )}
      {erroLogic2 && (
        <ErrorCard
          details={{
            message: "Are you sure to place this order ?",
            btn1: [true, "Ok"],
            btn2: [true, "Cancel"],
          }}
          fn={diplayCardHandler2}
        />
      )}
    </div>
  );
};

export default ViewCart;
