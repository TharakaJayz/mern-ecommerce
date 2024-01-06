import React, { useEffect, useState } from "react";
import "./ViewOrder.css";
import Navbar from "../../Components/Navbar/Navbar";
import { useParams } from "react-router";
import axios from "axios";
const ViewOrder = () => {
  const loggedUser = {
    userName: localStorage.getItem("userName"),
    token: localStorage.getItem("userToken"),
    cartItems: JSON.parse(localStorage.getItem("cartItems")),
  };

  const params = useParams();
  const ordId = params.orderId;
  console.log("orderid", ordId);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const orders = await axios.get(
          `http://localhost:8080/order/orderById/${ordId}`,
          {
            headers: {
              Authorization: "Bearer " + loggedUser.token,
            },
          }
        );

        if (!order) {
          setOrder([]);
          return;
        }

        setOrder(orders.data.details);
        console.log("order fetched by id", orders.data.details);
      } catch (err) {
        console.log("error fetching orders", err);
      }
    };

    getOrders();
  }, []);

  console.log("state of order", order);
  return (
    <div className="viewOrder_main">
      <Navbar />
      <div className="VO_body">
        <div className="VO_body_content">
          <section className="VO_body_sec_1">
            <div>
              <h5>
                Order: <span>{order._id}</span>
              </h5>
            </div>
            <div>
              <h5>
                Customer: <span>{order.custID}</span>
              </h5>
            </div>
          </section>
          <section className="VO_body_sec_2">
            <div>
              <span>DeliveryStatus:</span>
              <span>{order.deliveryStatus}</span>
            </div>
            <div>
              <span>Status:</span>
              <span>{order.status}</span>
            </div>
          </section>
          {order.length !== 0 &&
            order.items.map((singleOrder) => {
              return (
                <section className="VO_body_sec_3">
                  <div>
                    <img src={singleOrder.imageUrl} alt="item" />
                    <h5>
                      Price<span>{singleOrder.price}</span>
                    </h5>
                    <h5>
                      QTY<span>{singleOrder.quantity}</span>
                    </h5>
                  </div>
                </section>
              );
            })}

          <section className="VO_body_sec_4">
            <button id="DeliverOrder_btn">DeliverOrder</button>
            <button id="DeleteOrder_btn">DeleteOrder</button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
