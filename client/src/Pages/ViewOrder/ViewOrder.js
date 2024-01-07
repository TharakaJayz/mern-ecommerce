import React, { useEffect, useState } from "react";
import "./ViewOrder.css";
import Navbar from "../../Components/Navbar/Navbar";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import ErrorCard from "../../Components/ErrorCard/ErrorCard";
const ViewOrder = () => {
  const loggedUser = {
    userName: localStorage.getItem("userName"),
    token: localStorage.getItem("userToken"),
    cartItems: JSON.parse(localStorage.getItem("cartItems")),
  };

  const params = useParams();
  const ordId = params.orderId;
  const navigation = useNavigate();
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
        // console.log("order fetched by id", orders.data.details);
      } catch (err) {
        console.log("error fetching orders", err);
      }
    };

    getOrders();
  }, []);
  const [deleteOrderLogic, setDeleteOrderLogic] = useState(false);
  const [deliverOrderLogic, setDeliverOrderLogic] = useState(false);

  const deleteOrderHandler = () => {
    setDeleteOrderLogic(true);
  };

  const errorCardHandler = async (value) => {
    console.log("response from erro card handler", value);

    if (value.btn1) {
      const ordIdToDelete = ordId;
      try {
        const deletedOrder = await axios.delete(
          `http://localhost:8080/order/deleteOrderbyAdmin/${ordIdToDelete}`,
          {
            headers: {
              Authorization: "Bearer " + loggedUser.token,
            },
          }
        );

        if (deletedOrder) {
          setDeleteOrderLogic(false);
          navigation("/admin/orders");
        }
      } catch (err) {
        console.log("error deleting order", err);
      }
    } else {
      setDeleteOrderLogic(false);
      console.log("order do not deleted");
    }
  };

  const deliverOrderHandler = () => {
    setDeliverOrderLogic(true);
  };

  const deliverOrderErrorCardHandler = async (value) => {
    if (value.btn1) {
      try {
        const deletedOrder = await axios.put(
          `http://localhost:8080/order/deliverOrder/${ordId}`,
          {},
          {
            headers: {
              Authorization: "Bearer " + loggedUser.token,
            },
          }
        );

        if (deletedOrder) {
          setDeliverOrderLogic(false);
          window.location.reload();
        }
      } catch (err) {
        console.log("error delivering order", err);
      }
    } else {
      setDeliverOrderLogic(false);
    }
  };

  // console.log("state of order", order);
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
              <span>Delivery Status:</span>
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
                      Price<span>RS.{singleOrder.price}</span>
                    </h5>
                    <h5>
                      QTY<span>{singleOrder.quantity}</span>
                    </h5>
                  </div>
                </section>
              );
            })}

          <section className="VO_body_sec_4">
            {!(order.deliveryStatus === "Delivered") &&
              !(order.status === "Canceled") && (
                <button id="DeliverOrder_btn" onClick={deliverOrderHandler}>
                  DeliverOrder
                </button>
              )}
            {!(order.deliveryStatus === "Delivered") && true && (
              <button id="DeleteOrder_btn" onClick={deleteOrderHandler}>
                DeleteOrder
              </button>
            )}
          </section>
        </div>
        {deleteOrderLogic && (
          <ErrorCard
            details={{
              message: "Are You Sure Do You Want to delete this order ?",
              btn1: [true, "Yes"],
              btn2: [true, "No"],
            }}
            fn={errorCardHandler}
          />
        )}
        {deliverOrderLogic && (
          <ErrorCard
            details={{
              message: "Are You Sure Do You Want to deliver this order ?",
              btn1: [true, "Yes"],
              btn2: [true, "No"],
            }}
            fn={deliverOrderErrorCardHandler}
          />
        )}
      </div>
    </div>
  );
};

export default ViewOrder;
