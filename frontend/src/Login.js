import React, { useState, useEffect } from "react";
import Button from "./components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import eye from "./images/eye.png";

export default function Login(props) {
  const [emailLog, setEmailLog] = useState("");

  const [passwordLog, setPasswordLog] = useState("");

  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const login = () => {
    axios
      .post("http://localhost:3001/login", {
        email: emailLog,
        password: passwordLog,
      })
      .then((response) => {
        const data = response.data;
        console.log(data.message);
        setLoginStatus(data.message);
        if (data.result.length > 0) {
          const token = response.data.token;

          localStorage.setItem("token", token);
          if (data.result[0].role === "admin") {
            navigate("/admin");
          } else if (data.result[0].role === "ospatar") {
            navigate("/ospatar");
          } else if (data.result[0].role === "barman") {
            navigate("/barman");
          } else if (data.result[0].role === "bucatar") {
            navigate("/bucatar");
          } else if (data.result[0].role === "user") {
            navigate("/loggeduser");
          } else {
            navigate("");
          }
        }
      })

      .catch((error) => {
        console.error(error);
      });
  };

  const handleKeyDown = (event) => {
    if (event.code === "Enter") {
      login();
    }
  };

  return (
    <div className="container-log">
      <div className="card1">
        <h1 className="title1">Login</h1>
        <div className="email1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="typeyouremail@gmail.com"
            id="email"
            name="email"
            className="input1"
            onChange={(e) => {
              setEmailLog(e.target.value);
            }}
          ></input>
        </div>
        <div className="password1">
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="**********"
            id="password"
            name="password"
            className="input1"
            onChange={(e) => {
              setPasswordLog(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          ></input>
          <a className="toggle-password" onClick={togglePasswordVisibility}>
            <img src={eye} alt="toggle password visibility"></img>
          </a>
          <div className="error">{loginStatus ? loginStatus : " "}</div>
        </div>
        <Button
          type="button"
          className="button1"
          button="Login"
          onClick={() => {
            login();
          }}
        />

        <div className="account1">
          <h5>Don't have an account?</h5>
          <a href="/register">Register here.</a>
        </div>
      </div>
    </div>
  );
}
