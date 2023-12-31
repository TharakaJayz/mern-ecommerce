import React, { useEffect, useState } from "react";
import "./Orders.css";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router";
const Orders = () => {
  const loggedUser = {
    userName: localStorage.getItem("userName"),
    token: localStorage.getItem("userToken"),
    cartItems: JSON.parse(localStorage.getItem("cartItems")),
  };

  const navigation   = useNavigate();

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
          setOrders([]);
          return;
        }

        setOrders(orders.data.details);
        console.log("exsisting orders", orders.data.details);
      } catch (err) {
        console.log("error fetching orders", err);
      }
    };

    getOrders();
  }, []);
  return (
    <div className="order_main">
      <Navbar />

      <div className="order_body">
        {orders.map((sigleOrder) => {
          return (
            <div  key={sigleOrder._id}  className="order_item" onClick={()=>{
              navigation(`/admin/orders/${sigleOrder._id}`)
            }}>
              <section className="OI_sec1">
                <div>

                <h2>Order</h2>
                <h3>{sigleOrder._id}</h3>
                </div>
                <div>

                <h2>DeliveryStatus</h2>
                <h3>{sigleOrder.deliveryStatus}</h3>
                </div>
              </section>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
