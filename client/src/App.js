import {Routes,Route}  from 'react-router-dom'
import "./App.css";
import Home from "./Pages/Home/Home";
import SignUp from './Pages/SignUp/SignUp';
import Login from './Pages/Login/Login';
import ViewCart from './Pages/ViewCart/ViewCart';
import AdminHome from './Pages/AdminHome/AdminHome';
import Orders from './Pages/Orders/Orders';
import { useEffect } from 'react';
import ViewOrder from './Pages/ViewOrder/ViewOrder';

function App() {
 


     const loggedUser = {
      // userName: localStorage.getItem("userName"),
      token: localStorage.getItem("userToken"),
      userType: localStorage.getItem("userType") || "user"
    };



   console.log("user token logic ",loggedUser.token && true)
  return (
    <div className="App_main">
      <Routes>
        <Route path = "/"  element = {<Home/>}  />
        <Route path = "/signUp"  element = {<SignUp/>}  />
        <Route path = "/login"  element = {<Login/>}  />
        {loggedUser.token  && (
          <></>
          )}
          <Route path = "/cart"  element = {<ViewCart/>}  />
        { loggedUser.userType === "admin" && (
          <>
          </>
          )}
          <Route path='/admin'   element = {<AdminHome />}  />
          <Route path='/admin/orders'   element = {<Orders />}  />
          <Route path='/admin/orders/:orderId'   element = {<ViewOrder />}  />
      </Routes>
      
    </div>
  );
}

export default App;
