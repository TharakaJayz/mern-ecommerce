import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../../Components/Navbar/Navbar";
import ItemCard from "../../Components/ItemCard/ItemCard";
import { HiOutlineDeviceTablet } from "react-icons/hi";
import { AiOutlineLaptop } from "react-icons/ai";
import { FaMobileAlt } from "react-icons/fa";
import { MdImportantDevices } from "react-icons/md";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import "swiper/css/zoom";

// import required modules
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectFade,
  Zoom,
} from "swiper/modules";

import img1 from "../../Assets/banner 1.png";
import img2 from "../../Assets/banner 2.png";
import img3 from "../../Assets/banner 3.png";
import img4 from "../../Assets/banner 4.png";
import img5 from "../../Assets/banner 5.png";
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
        console.log("back items in home", itemsFromBackend.data.details);
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
        <div className="home_sections_banner">
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#ffd",
            }}
            zoom={true}
            spaceBetween={30}
            effect={"fade"}
            loop={true}
            centeredSlides={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={false}
            EffectFade={true}
            modules={[Autoplay, Pagination, Navigation, EffectFade, Zoom]}
            speed={3000}
            className="mySwiper"
          >
            <SwiperSlide className="mySwiper-slice">
              {" "}
              <img src={img1} alt="slider-1" />
            </SwiperSlide>
            <SwiperSlide className="mySwiper-slice">
              {" "}
              <img src={img2} alt="slider-2" />
            </SwiperSlide>
            <SwiperSlide className="mySwiper-slice">
              {" "}
              <img src={img3} alt="slider-1" />
            </SwiperSlide>
            <SwiperSlide className="mySwiper-slice">
              {" "}
              <img src={img4} alt="slider-3" />
            </SwiperSlide>
            <SwiperSlide className="mySwiper-slice">
              {" "}
              <img src={img5} alt="slider-3" />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="home_sections_wrapper">
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
                if (item.quantity > 0) {
                  return (
                    <div key={item.id}>
                      {" "}
                      <ItemCard
                        imageUrl={item.imageUrl}
                        title={item.title}
                        price={item.price}
                        qty={item.quantity}
                        id={item._id.toString()}
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
                        id={item._id.toString()}
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
                        id={item._id.toString()}
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
                        id={item._id.toString()}
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
    </div>
  );
};

export default Home;
