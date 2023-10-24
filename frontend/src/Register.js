import React, { useState } from "react";
import Button from "./components/Button";
import axios from "axios";
import eye from "./images/eye.png";

export default function Register() {
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);

  const emailValidation = () => {
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (regEx.test(emailReg)) {
      setMessage("Email is valid");
      axios
        .post("http://localhost:3001/register", {
          email: emailReg,
          password: passwordReg,
          lastname: lastname,
          firstname: firstname,
          role: "user",
        })
        .then((response) => {
          console.log(response);
          alert(response.data);
        })
        .catch((error) => console.error(error));
    }
  };

  const passwordValidation = () => {
    if (passwordReg === "") {
      setMessage("Password is required");
    } else {
      setMessage("");
    }
  };

  const lastnameValidation = () => {
    if (lastname === "") {
      setMessage("Last name is required!");
    } else {
      setMessage("");
    }
  };

  const firstnameValidation = () => {
    if (firstname === "") {
      setMessage("First name is required!");
    } else {
      setMessage("");
    }
  };

  return (
    <div className="container-log">
      <div className="card1">
        <h1 className="title1">Register</h1>
        <div className="email1">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            placeholder="First Name"
            id="fname"
            name="fname"
            className="input1"
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
          ></input>

          <label htmlFor="email">Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            id="lname"
            name="lname"
            className="input1"
            onChange={(e) => {
              setLastname(e.target.value);
            }}
          ></input>

          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="typeyouremail@gmail.com"
            id="email"
            name="email"
            className="input1"
            onChange={(e) => {
              setEmailReg(e.target.value);
              setEmailTouched(true);
            }}
          ></input>
        </div>
        <div className="password1">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="**********"
            id="password"
            name="password"
            className="input1"
            onChange={(e) => {
              setPasswordReg(e.target.value);
            }}
          ></input>
        </div>
        <Button
          type="button"
          className="button1"
          button="Register"
          id="register"
          onClick={() => {
            emailValidation();
            passwordValidation();
            lastnameValidation();
            firstnameValidation();
          }}
        />

        <Button
          type="button"
          className="button1"
          button="Back"
          id="back"
          onClick={() => {
            window.location.href = "http://localhost:3000";
          }}
        />
      </div>
    </div>
  );
}
