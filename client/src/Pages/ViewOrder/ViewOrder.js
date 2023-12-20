import React, { useState } from 'react'
import "./ViewOrder.css";
import Navbar from '../../Components/Navbar/Navbar';
const ViewOrder = () => {
    const deliverPersons = [
        {id:1,name:"tharaka"},
        {id:2,name:"prabhath"},
        {id:3,name:"eranga"},
    ]

    const [deliverPersonInput,setDeliveryPerson]= useState("");

    const formHandler = (e) =>{
        e.preventDefault();
        console.log("View order form values",deliverPersonInput);
        
    }
    
  return (
    <div className='viewOrder_main'>
        <Navbar />
      <div className='VO_body'>
        <div className='VO_order'>
            <h1>Order:</h1>
            <section className='VO_order_item'>
                <img src='https://www.laptop.lk/wp-content/uploads/2023/04/Dell-5525-G15-Gaming-Laptop-%E2%80%93-R5.jpg'  alt='item' />
                <div id='single_order'>

              
                <section>
                    <span>Title</span>
                    <span>t</span>
                    </section> 
                <section>
                    <span>Price</span>
                    <span></span>
                    </section> 
                <section>
                    <span>QTY</span>
                    <span></span>
                    </section> 
                    </div>
            </section>
            <div>
                
            </div>
        </div>
        <div className='VO_deliver'>
            <form onSubmit={formHandler}>
                <section>

                <span>Delivery Person:</span>
                <select value={deliverPersonInput} onChange={ (e)=>{setDeliveryPerson(e.target.value)}}>
                    <option></option>
                    {deliverPersons.map((person)=>{
                        return(<option value={person.id}> {person.name}</option>)
                    })}
                </select>
                </section>
                <section id='VO_btn_sec'>
                    <button type='submit'>Submit</button>
                    <button>Cancel</button>
                </section>
            </form>
        </div>
      </div>
    </div>
  )
}

export default ViewOrder
