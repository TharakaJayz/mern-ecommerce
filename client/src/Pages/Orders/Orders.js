import React from 'react';
import "./Orders.css";
import Navbar from '../../Components/Navbar/Navbar';
const Orders = () => {
  return (
    <div className='order_main'>
      <Navbar />
      
      <div className='order_body'>
        <div className='order_item'>
            <section className='OI_sec1'>

            <h2>Order No:</h2>
            <h2>119</h2>
            </section>
        </div>
        <div className='order_item'>
            <section className='OI_sec1'>

            <h2>Order No:</h2>
            <h2>119</h2>
            </section>
        </div>
        <div className='order_item'>
            <section className='OI_sec1'>

            <h2>Order No:</h2>
            <h2>119</h2>
            </section>
        </div>
      </div>
    </div>
  )
}

export default Orders
