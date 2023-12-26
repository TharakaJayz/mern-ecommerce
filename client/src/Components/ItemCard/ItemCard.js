import React from "react";
import "./ItemCard.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../Store/Cart-slice";
const ItemCard = (props) => {
  const dispatch = useDispatch();

  const buttonHandler = () => {
    // dispatch(cartActions.addToCart({item:props.title,price:props.price,qty:props.qty,id:props.id,ORDQTY:1,brand:props.brand}));
    dispatch(
      cartActions.addToCart({
        item: props.title,
        price: parseInt(props.price),
        qty: parseInt(props.qty),
        id: props.id.trim(),
        ORDQTY: 1,
        brand: props.brand,
      })
    );
  };


  return (
    <div className="item_main">
      <img src={props.imageUrl} alt="item" id="item_img" />
      <div className="item_main_wrapper">
        <span className="item_main_span left_align">{props.description}</span>
        <h3 className="item_main_h3 left_align">RS:{props.price}</h3>
        <h4 className="item_main_h4 left_align"> Quantity: {props.qty}</h4>
        <button className="item_main_button" onClick={buttonHandler}>
          add to cart
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
