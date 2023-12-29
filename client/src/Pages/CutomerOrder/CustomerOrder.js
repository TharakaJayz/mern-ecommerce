import React, { useEffect, useState } from "react";
import "./CustomerOrder.css";
import Navbar from "../../Components/Navbar/Navbar";
import { useParams } from "react-router";
import axios from "axios";
import ErrorCard from "../../Components/ErrorCard/ErrorCard";

const CustomerOrder = () => {
  const loggedUser = {
    userName: localStorage.getItem("userName"),
    token: localStorage.getItem("userToken"),
    cartItems: JSON.parse(localStorage.getItem("cartItems")),
  };

  const userID = useParams().userID;
  const [orders, setOrders] = useState([]);
  const [cancelOrderLogic, setCancelOrderLogic] = useState(false);
  const [ordIdToDelete, setOrdIdToDelete] = useState("");
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const orders = await axios.get(
          "http://localhost:8080/order/all_orders",
          {
            headers: {
              Authorization: "Bearer " + loggedUser.token,
            },
          }
        );

        if (!orders) {
          setOrders([]);
          return;
        }

        setOrders(orders.data.details);
      } catch (err) {
        console.log("error fetching orders", err);
      }
    };

    getOrders();
  }, []);

  const cancelOrderHandler = () => {
    setCancelOrderLogic(true);
  };

  const CancelOrderErroCardHandler = async (value) => {
    if (value.btn1) {
      setCancelOrderLogic(false);
    }
    if (value.btn2) {
      console.log("deleting id 2", ordIdToDelete);
      try {
        const deletedOrder = await axios.delete(
          `http://localhost:8080/order/deleteOrder/${ordIdToDelete}`,
          {
            headers: {
              Authorization: "Bearer " + loggedUser.token,
            },
          }
        );

        if (deletedOrder) {
          window.location.reload();
        }
      } catch (err) {
        console.log("error deleting order", err);
      }
    }
  };

  return (
    <div className="customerOrder_main">
      <Navbar />
      <div className="customerOrder_main_content">
        <h2 className="customerOrder_main_content_h1">My Orders</h2>
        <section className="customerOrder_main_content_section_main">
          {orders.length===0 && (<div style={{"text-align":"center","marginTop":"20vh"}}>You haven't any orders.</div>)}
          {orders.map((order) => {
            if ((order.custID === userID) &&(order.status !== "Canceled")) {
              return (
                <div className="customerOrder_main_content_section_main_div_main">
                  <section className="section_main_div_main_sec-1">
                    <div className="main_sec-1_wrapper_1">
                      <h5>
                        Order<span> #{order._id} </span>
                      </h5>
                      <p>Placed on {order.createdAt}</p>
                    </div>

                    <div className="main_sec-1_wrapper_2">
                      <span>{order.status}</span>
                      <button
                        onClick={() => {
                          setOrdIdToDelete(order._id);
                          cancelOrderHandler();
                        }}
                      >
                        Cancel Order
                      </button>
                    </div>
                  </section>
                  {order.items.map((orderdItem) => {
                    return (
                      <section className="section_main_div_main_sec-2">
                        <img src={orderdItem.imageUrl} alt="item" />
                        <p id="main_sec-2_title_para">{orderdItem.title}</p>
                        <p id="main_sec-2_qty_para">
                          Qty:<span>{orderdItem.quantity}</span>
                        </p>
                        <span
                          id="main_sec-2_deliverStatus_para"
                          className={
                            order.deliveryStatus === "Ongoing"
                              ? `ongoing_status`
                              : `deliverd_status`
                          }
                        >
                          {order.deliveryStatus}
                        </span>
                        <p id="main_sec-2_price_para">
                          Rs.{orderdItem.price * orderdItem.quantity}
                        </p>
                      </section>
                    );
                  })}
                </div>
              );
            }
          })}
        </section>
      </div>
      {cancelOrderLogic && (
        <ErrorCard
          details={{
            message: "Are you sure do you want to cancel this order ?",
            btn1: [true, "NO"],
            btn2: [true, "Yes"],
          }}
          fn={CancelOrderErroCardHandler}
        />
      )}
    </div>
  );
};

export default CustomerOrder;
