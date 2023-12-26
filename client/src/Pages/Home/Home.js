import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../../Components/Navbar/Navbar";
import ItemCard from "../../Components/ItemCard/ItemCard";
import { HiOutlineDeviceTablet } from "react-icons/hi";
import { AiOutlineLaptop } from "react-icons/ai";
import { FaMobileAlt } from "react-icons/fa";
import { MdImportantDevices } from "react-icons/md";
// import { items } from "../../Data/Data";
import axios from "axios";
const Home = () => {
  const [selectedTitle, setSelectedTitle] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const gettingItems = async () => {
      try {
        const itemsFromBackend = await axios.get(
          "http://localhost:8080/product/all_products"
        );
        // const itemsFromBackend = await axios.get(
        //   "http://localhost:8081/api/v1/product/all product"
        // );
        console.log("items in DB", itemsFromBackend.data.details);
        setItems(itemsFromBackend.data.details);
        console.log("back items in home",itemsFromBackend.data.details)
      } catch (err) {
        console.log("item fetching error", err);
      }
    };
    gettingItems();
  }, []);
  return (
    <div className="home_main">
      <Navbar />
      <div className="home_sections">
        <section className="home_sec home_sec-1">
          <div
            className={
              selectedTitle === "All"
                ? `sec-1_div sec_1_div_display`
                : `sec-1_div`
            }
            onClick={() => {
              setSelectedTitle("All");
            }}
          >
            <span>
              {" "}
              <MdImportantDevices />
            </span>
            <span>All</span>
          </div>
          <div
            className={
              selectedTitle === "Mobile"
                ? `sec-1_div sec_1_div_display`
                : `sec-1_div`
            }
            onClick={() => {
              setSelectedTitle("Mobile");
            }}
          >
            <span>
              {" "}
              <FaMobileAlt />
            </span>
            <span>Mobile</span>
          </div>
          <div
            className={
              selectedTitle === "Laptop"
                ? `sec-1_div sec_1_div_display`
                : `sec-1_div`
            }
            onClick={() => {
              setSelectedTitle("Laptop");
            }}
          >
            <span>
              {" "}
              <AiOutlineLaptop />
            </span>
            <span>Laptop </span>
          </div>
          <div
            className={
              selectedTitle === "Tab"
                ? `sec-1_div sec_1_div_display`
                : `sec-1_div`
            }
            onClick={() => {
              setSelectedTitle("Tab");
            }}
          >
            <span>
              {" "}
              <HiOutlineDeviceTablet />
            </span>
            <span>Tab</span>
          </div>
        </section>
       
        <section className="home_sec home_sec-2">
          {selectedTitle === "All" &&
            items.map((item) => {
              if(item.quantity > 0){

                return (
                  <div key={item.id}>
                    {" "}
                    <ItemCard
                      imageUrl={item.imageUrl}
                      title={item.title}
                      price={item.price}
                      qty={item.quantity}
                      id={item._id.toString() }
                      brand={item.brand}
                      description={item.description}
                    />{" "}
                  </div>
                );
              }
            })}

          {selectedTitle === "Mobile" &&
            items.map((item) => {
              if (item.category.name.trim() === "Mobile") {
                return (
                  <div key={item.id}>
                    {" "}
                    <ItemCard
                      imageUrl={item.imageUrl}
                      title={item.title}
                      price={item.price}
                      qty={item.quantity}
                      id={item._id.toString() }
                      brand={item.brand}
                      description={item.description}
                    />{" "}
                  </div>
                );
              } else {
                return <></>;
              }
            })}

          {selectedTitle === "Laptop" &&
            items.map((item) => {
              if (item.category.name.trim() === "Laptop") {
                return (
                  <div key={item.id}>
                    {" "}
                    <ItemCard
                      imageUrl={item.imageUrl}
                      title={item.title}
                      price={item.price}
                      qty={item.quantity}
                      id={item._id.toString() }
                      brand={item.brand}
                      description={item.description}
                    />{" "}
                  </div>
                );
              } else {
                return <></>;
              }
            })}

          {selectedTitle === "Tab" &&
            items.map((item) => {
              if (item.category.name.trim() === "Tab") {
                return (
                  <div key={item.id}>
                    {" "}
                    <ItemCard
                      imageUrl={item.imageUrl.toString()}
                      title={item.title}
                      price={item.price}
                      qty={item.quantity}
                      id={item._id.toString() }
                      brand={item.brand}
                      description={item.description}
                    />{" "}
                  </div>
                );
              } else {
                <></>;
              }
            })}
        </section>
      </div>
    </div>
  );
};

export default Home;
