import { createSlice } from "@reduxjs/toolkit";
// import { items } from "../Data/Data";
import axios from "axios";





 const getItems = async()  =>{

  try {
     const itemsFromBackend = await axios.get(
      "http://localhost:8081/api/v1/product/all product"
    );
    // console.log("items in DB", itemsFromBackend.data);
    return itemsFromBackend.data;
    
    
  } catch (err) {
    // console.log("item fetching error", err);
    return [];
  }
}

let items = await getItems()


// console.log("items in redux",items)
const loggedUser = {
  // userName: localStorage.getItem("userName"),
  token: localStorage.getItem("userToken"),
  cartItems: JSON.parse(localStorage.getItem("cartItems")),
  userType:localStorage.getItem("userType")
};



let state =
  loggedUser.token && loggedUser.cartItems.cartItems.length > 0 && loggedUser.userType === "user"
    ? loggedUser.cartItems
    : {
        cartItems: [],
        totalItems: 0,
        totalPrice: 0,
      };

const cartSlice = createSlice({
  name: "cart",
  initialState: state,
  reducers: {
    addToCart(state, action) {
      let existingIndex = state.cartItems.findIndex(
        (item) => item.id.trim() === action.payload.id.trim()
      );
      // console.log("items in redux",items)
      const exisistingItemDetails = items.filter(
        (singleItem) => singleItem.id == action.payload.id.trim()
      )[0];
      // console.log("selected Item",exisistingItemDetails.quantity);
      if (existingIndex >= 0) {
        if (
          exisistingItemDetails.quantity > state.cartItems[existingIndex].ORDQTY
        ) {
          state.cartItems[existingIndex].ORDQTY++;
          state.totalPrice += action.payload.price;
        }
      } else {
        state.cartItems.push(action.payload);
        state.totalPrice += action.payload.price * action.payload.ORDQTY;
      }

      // state.totalItems++;
      state.totalItems = state.cartItems.length;
    },

    removeFromCart(state, action) {
      let existingIndex = state.cartItems.findIndex(
        (item) => item.id.trim() === action.payload.id.trim()
      );

      if (existingIndex >= 0) {
        if (state.cartItems[existingIndex].ORDQTY === 1) {
          state.cartItems.splice(existingIndex, 1);
          state.totalItems = state.cartItems.length;
          state.totalPrice -= action.payload.ORDQTY * action.payload.price;
          return;
        }
        if (state.cartItems[existingIndex].ORDQTY >= 1) {
          state.cartItems[existingIndex].ORDQTY--;
          // console.log("reduced ORDQTY", state.cartItems[existingIndex].ORDQTY);
          state.totalPrice -= action.payload.price;
          // console.log("reduced price", action.payload.price);
          if(state.totalItems>0 && (state.cartItems[existingIndex].ORDQTY ===0)){

            state.totalItems--;
          }
          return;
        } else {
          state.cartItems.splice(existingIndex, 1);
          state.totalItems = state.cartItems.length;
        }
      } else {
      }
    },

    dropFromCart(state, action) {
      let existingIndex = state.cartItems.findIndex(
        (item) => item.id.trim() === action.payload.id.trim()
      );
      // console.log("indexd to pop", existingIndex);
      // console.log("received indexd to pop", action.payload.id);
      state.cartItems.splice(existingIndex, 1);
      state.totalItems = state.cartItems.length;
      state.totalPrice -= action.payload.ORDQTY * action.payload.price;
    },
    deleteCart(state){
      state.cartItems = [];
      state.totalItems = 0;
      state.totalPrice -= 0;

    }
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
