import React, { useState } from "react";
import "./Login.css";
import { checkEmpty } from "../../Validations/Validations";
import { useNavigate } from "react-router";
import axios from "axios";
const Login = () => {
  const [error, setError] = useState([false, ""]);
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [isCheckd, setIsChecked] = useState(false);
  const navigation = useNavigate();
  const formHandler = async (e) => {
    e.preventDefault();
    if (checkEmpty(email) || checkEmpty(Password)) {
      setError([true, "email or password could not empty"]);
      return;
    }

    try {
      if (isCheckd) {
        //this is should be admin post request for anothe endpoint
        const token = await axios.post(
          "http://localhost:8081/api/v1/auth/signIn",
          { email: email, password: Password }
        );

        localStorage.setItem("userToken", token.data.token);
        localStorage.setItem("userName", email);
        // localStorage.setItem("userType", "user");
        localStorage.setItem("userType", "admin");
        localStorage.setItem("cartItems",  JSON.stringify( {
          cartItems: [],
          totalItems: 0,
          totalPrice: 0,
        }));
        navigation("/");
        return;
      }
      const token = await axios.post(
        "http://localhost:8081/api/v1/auth/signIn",
        { email: email, password: Password }
      );

      localStorage.setItem("userToken", token.data.token);
      localStorage.setItem("userName", email);
      localStorage.setItem("userType", "user");
      localStorage.setItem("cartItems",  JSON.stringify( {
        cartItems: [],
        totalItems: 0,
        totalPrice: 0,
      }));
      navigation("/");
    } catch (err) {
      console.log(err);
    }

    setError([false, "all fine"]);
    // navigation("/");
  };
  return (
    <div className="login_main">
      <div className="login_body">
        <form onSubmit={formHandler}>
          <section>
            <span className="lgin_spn">Email</span>
            <input
              className="lgin_input"
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </section>
          <section>
            <span className="lgin_spn">Password</span>
            <input
              className="lgin_input"
              type="password"
              name="password"
              value={Password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </section>
          {error[0] && <p> {error[1]}</p>}
          <div id="admin_div">
            <section>
              <input
                type="checkbox"
                value="admin"
                onChange={(e) => {
                  setIsChecked(e.target.checked);
                }}
              />
              <span>Admin</span>
            </section>
            <button>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
