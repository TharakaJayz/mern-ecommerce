import React, { useEffect, useState } from 'react'
import "./ViewOrder.css";
import Navbar from '../../Components/Navbar/Navbar';
import { useParams } from 'react-router';
import axios from 'axios';
const ViewOrder = () => {
    const loggedUser = {
        userName: localStorage.getItem("userName"),
        token: localStorage.getItem("userToken"),
        cartItems: JSON.parse(localStorage.getItem("cartItems")),
      };
    
  
    const params =useParams();
    const ordId = params.orderId;
    console.log("orderid",ordId);
    const [orders,setOrders] =useState([]);

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
    
            if (!orders) {
              setOrders([]);
              return;
            }

    
            setOrders(orders.data.details);
            console.log("order fetched by id",orders.data.details);
          } catch (err) {
            console.log("error fetching orders", err);
          }
        };
    
        getOrders();
      }, []);
    
  return (
    <div className='viewOrder_main'>
        <Navbar />
      <div className='VO_body'>
      
      </div>
    </div>
  )
}

export default ViewOrder
