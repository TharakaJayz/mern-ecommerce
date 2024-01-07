import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/Login/Login";
import ViewCart from "./Pages/ViewCart/ViewCart";
import AdminHome from "./Pages/AdminHome/AdminHome";
import Orders from "./Pages/Orders/Orders";
import ViewOrder from "./Pages/ViewOrder/ViewOrder";
import CustomerOrder from "./Pages/CutomerOrder/CustomerOrder";
import { TbFaceIdError } from "react-icons/tb";

function App() {
  const loggedUser = {
    // userName: localStorage.getItem("userName"),
    token: localStorage.getItem("userToken"),
    userType: localStorage.getItem("userType") || "user",
  };

  return (
    <div>
      <div className="App_main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders/:userID" element={<CustomerOrder />} />
          {loggedUser.token && <></>}
          <Route path="/cart" element={<ViewCart />} />
          {loggedUser.userType === "admin" && <></>}
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/orders/:orderId" element={<ViewOrder />} />
        </Routes>
      </div>
      <div className="small-screens">
      <TbFaceIdError id="scree-error"/>
        <h1>

        To view this e-commerce website you need minimum display width 1280px
        </h1>
      </div>
    </div>
  );
}

export default App;
