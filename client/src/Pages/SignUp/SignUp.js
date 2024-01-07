import React, { useState } from "react";
import "./SignUp.css";
import {
  checkEmpty,
  passwordConfirmation,
} from "../../Validations/Validations";
import ErrorCard from "../../Components/ErrorCard/ErrorCard";
import { useNavigate } from "react-router";
import axios from "axios";
const SignUp = () => {
  const navigation = useNavigate();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordlInput] = useState("");
  const [fNameInput, setFnameInput] = useState("");
  const [LnameInput, setLnameInput] = useState("");
  const [mobileInput, setMobileInput] = useState("");
  const [addressInput, setAddressInput] = useState("");

  const [errorLogic, setErrorLogic] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState({ logic: false, messsage: "" });
  const [displayCardLogic, setDisplayCardLogic] = useState(false);
  const diplayCardHandler = (value) => {
    console.log(value);
    if (value.btn1) {
      navigation("/");
    }
  };
  const formHandler = async (e) => {
    e.preventDefault();
    if (checkEmpty(fNameInput) || checkEmpty(LnameInput)) {
      setError({
        logic: true,
        messsage: "FirstName or LastName could not  empty ",
      });
      return;
    }

    if (checkEmpty(mobileInput)) {
      setError({ logic: true, messsage: "mobile could not empty" });
      return;
    }
    if (checkEmpty(mobileInput)) {
      setError({ logic: true, messsage: "mobile could not empty" });
      return;
    }
    if (checkEmpty(addressInput)) {
      setError({ logic: true, messsage: "address could not empty" });
      return;
    }

    if (!passwordConfirmation(passwordInput, confirmPasswordInput)[0]) {
     
      setError({logic:true,messsage:passwordConfirmation(passwordInput, confirmPasswordInput)[1]})
      return;
    }
    setErrorLogic(false);
    const formDetails = {
      email: emailInput,
      password: passwordInput,
      fname: fNameInput,
      lname: LnameInput,
      mobile: mobileInput,
      address: addressInput,
    };
    try {
      const respond = await axios.post("http://localhost:8080/auth/signUp", {
        email: emailInput,
        password: passwordInput,
        firstName: fNameInput,
        lastName: LnameInput,
        mobile: mobileInput,
        address: addressInput,
      });
      setDisplayCardLogic(true);

      console.log("sign in respond", respond);
    } catch (err) {
      console.log(err);
      if(err.request.status ==500){
        window.location.reload();
      }
      setError({logic:true,messsage:err.response.data.message});
    }

    console.log(formDetails);
  };
  return (
    <div className="signUp_main">
      <div className="signUp_body">
        <h2>Sign Up</h2>
        <form className="signUp_form" onSubmit={formHandler}>
          <section>
            <span className="form_input_lable">email</span>
            <input
              type="email"
              name="email"
              className="form_input"
              value={emailInput}
              onChange={(e) => {
                setEmailInput(e.target.value);
              }}
            />
          </section>
          <section>
            <span className="form_input_lable">passowrd</span>
            <input
              type="password"
              name="password"
              className="form_input"
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.target.value);
              }}
            />
          </section>
          <section>
            <span className="form_input_lable">Confirm passowrd</span>
            <input
              type="password"
              name="Cpassword"
              className="form_input"
              value={confirmPasswordInput}
              onChange={(e) => {
                setConfirmPasswordlInput(e.target.value);
              }}
            />
          </section>
          <section>
            <span className="form_input_lable">First Name</span>
            <input
              type="text"
              name="firstName"
              className="form_input"
              value={fNameInput}
              onChange={(e) => {
                setFnameInput(e.target.value);
              }}
            />
          </section>
          <section>
            <span className="form_input_lable">Last Name</span>
            <input
              type="text"
              name="LastName"
              className="form_input"
              value={LnameInput}
              onChange={(e) => {
                setLnameInput(e.target.value);
              }}
            />
          </section>
          <section>
            <span className="form_input_lable">Mobile</span>
            <input
              type="text"
              name="mobile"
              className="form_input"
              value={mobileInput}
              onChange={(e) => {
                setMobileInput(e.target.value);
              }}
            />
          </section>
          <section>
            <span className="form_input_lable">Address</span>
            <textarea
              id="address_input"
              value={addressInput}
              onChange={(e) => {
                setAddressInput(e.target.value);
              }}
            ></textarea>
          </section>
         
          {error.logic && <section id="signError">{error.messsage}</section>}
          {displayCardLogic && (
            <ErrorCard
              details={{
                message: "Successfully SignUp",
                btn1: [true, "ok"],
                btn2: [false, "cancel"],
              }}
              fn={diplayCardHandler}
            />
          )}

          <button>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
