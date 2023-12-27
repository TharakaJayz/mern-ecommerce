import React, { useState } from "react";
import "./AdminHome.css";
import Navbar from "../../Components/Navbar/Navbar";
import { checkEmpty } from "../../Validations/Validations";
import axios from "axios";
import ErrorCard from "../../Components/ErrorCard/ErrorCard";

const AdminHome = () => {
  const loggedUser = {
    // userName: localStorage.getItem("userName"),
    token: localStorage.getItem("userToken"),
    userType: localStorage.getItem("userType") || "user",
  };

  const [cardLogic, setCardLogic] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [qtyInput, setQtyInput] = useState("");
  const [brandInput, setBrandInput] = useState("");
  const [imageInput, setImageInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");

  const [error, setError] = useState({ logic: false, msg: "" });

  const diplayCardHandler = (value) => {
    if (value) {
      window.location.reload();
    }
  };

  const formHandler = async (e) => {
    e.preventDefault();

    if (
      checkEmpty(titleInput) ||
      checkEmpty(descInput) ||
      checkEmpty(priceInput) ||
      checkEmpty(qtyInput) ||
      checkEmpty(brandInput) ||
      checkEmpty(imageInput) ||
      checkEmpty(categoryInput)
    ) {
      setError({
        logic: true,
        msg: "All Fields Should Be Filled",
      });
      return;
    }

    try {
      const itemRespond = await axios.post(
        "http://localhost:8080/product/add_product",
        {
          title: titleInput,
          description: descInput,
          price: priceInput,
          quantity: qtyInput,
          brand: brandInput,
          categoryId: categoryInput,
          imageUrl: imageInput,
        },
        {
          headers: {
            Authorization: "Bearer " + loggedUser.token,
          },
        }
      );
    } catch (err) {
      setError({ logic: true, msg: `${err.response.data.message}` });
      return;
    }

    setError({ logic: false, msg: "" });
    setCardLogic(true);

    setTitleInput("");
    setDescInput("");
    setPriceInput("");
    setQtyInput("");
    setBrandInput("");
    setImageInput("");
    setCategoryInput("");
  };

  const cancelButtonHandler = () => {
    setTitleInput("");
    setDescInput("");
    setPriceInput("");
    setQtyInput("");
    setBrandInput("");
    setImageInput("");
    setCategoryInput("");
  };
  return (
    <div className="AH_main">
      <Navbar />
      <div className="AH_body">
        <form className="AH_form" onSubmit={formHandler}>
          <h2>Add New Product</h2>
          <div id="image_container">
            {" "}
            <img
              src={imageInput}
              alt="Item"
              className={
                imageInput === ""
                  ? "image_container_image image_hidden"
                  : "image_container_image"
              }
            />
          </div>

          <section>
            <span>Title</span>
            <input
              type="text"
              name="title"
              value={titleInput}
              onChange={(e) => {
                setTitleInput(e.target.value);
              }}
              className="AH_form_input"
            />
          </section>
          <section>
            <span>Description</span>
            <input
              className="AH_form_input"
              type="text"
              name="description"
              value={descInput}
              onChange={(e) => {
                setDescInput(e.target.value);
              }}
            />
          </section>
          <section>
            <span>Price</span>
            <input
              className="AH_form_input"
              type="text"
              name="Price"
              value={priceInput}
              onChange={(e) => {
                setPriceInput(e.target.value);
              }}
            />
          </section>
          <section>
            <span>quantity</span>
            <input
              className="AH_form_input"
              type="text"
              name="quantity"
              value={qtyInput}
              onChange={(e) => {
                setQtyInput(e.target.value);
              }}
            />
          </section>
          <section>
            <span>brand</span>
            <input
              className="AH_form_input"
              type="text"
              name="brand"
              value={brandInput}
              onChange={(e) => {
                setBrandInput(e.target.value);
              }}
            />
          </section>
          <section>
            <span>category</span>

            <select
              value={categoryInput}
              onChange={(e) => {
                setCategoryInput(e.target.value);
              }}
              className="AH_form_input_menu"
            >
              <option value=""></option>
              <option value="1">Mobile</option>
              <option value="2">Laptop</option>
              <option value="3">Tab</option>
            </select>
          </section>
          <section>
            <span>imageUrl</span>
            <input
              className="AH_form_input"
              type="text"
              name="imageUrl"
              value={imageInput}
              onChange={(e) => {
                setImageInput(e.target.value);
              }}
            />
          </section>

          {error.logic && <p>{error.msg}</p>}

          <div className="AH_form_btn_div">
            <button className="AH_form_btn_div_btn" type="submit">
              Add Item
            </button>
            <button
              className="AH_form_btn_div_btn"
              onClick={() => {
                cancelButtonHandler();
              }}
              type="reset"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      {cardLogic && (
        <ErrorCard
          details={{
            message: "Item Added Successfully",
            btn1: [true, "ok"],
            btn2: [false, "cancel"],
          }}
          fn={diplayCardHandler}
        />
      )}
    </div>
  );
};

export default AdminHome;
