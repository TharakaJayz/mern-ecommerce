import React, { useEffect, useState } from "react";
import "./CustomerOrder.css";
import Navbar from "../../Components/Navbar/Navbar";
import { useParams } from "react-router";
import axios from "axios";

const CustomerOrder = () => {
  const loggedUser = {
    userName: localStorage.getItem("userName"),
    token: localStorage.getItem("userToken"),
    cartItems: JSON.parse(localStorage.getItem("cartItems")),
  };

  const userID = useParams().userID;
  const [orders, setOrders] = useState([]);

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
          return;
        }

        setOrders(orders.data.details);

        // const orderRelated = orders.data.details.map((order)=>{
        //     if(order.custID===userID){
        //         return order
        //     }
        // })
        // if(!orderRelated){
        //     console.log("this if working")
        //     setOrders([]);
        //     return;
        // }
        // console.log(orders.data.details);
        // console.log("new orders",orderRelated);
      } catch (err) {
        console.log("error fetching orders", err);
      }
    };

    getOrders();
  }, []);

  console.log("orders", orders);

  return (
    <div className="customerOrder_main">
      <Navbar />
      <div className="customerOrder_main_content">
        <h2 className="customerOrder_main_content_h1">My Orders</h2>
        <section className="customerOrder_main_content_section_main">
          {orders.map((order) => {
            if (order.custID === userID) {
              return (
                <div className="customerOrder_main_content_section_main_div_main">
                  <section className="section_main_div_main_sec-1">
                    <h5>
                      {" "}
                      Order<span> #{order._id} </span>
                    </h5>
                    <p>Placed on {order.createdAt}</p>
                  </section>
                  {order.items.map((orderdItem) => {
                    return (
                      <section className="section_main_div_main_sec-2">
                        <img src={orderdItem.imageUrl} alt="item" />
                        <p>{orderdItem.title}</p>
                        <p>
                          Qty:<span>{orderdItem.quantity}</span>
                        </p>
                        <span>{order.deliveryStatus}</span>
                        <p>Rs.{orderdItem.price * orderdItem.quantity}</p>
                      </section>
                    );
                  })}
                </div>
              );
            }
          })}
        </section>
      </div>
    </div>
  );
};

export default CustomerOrder;
