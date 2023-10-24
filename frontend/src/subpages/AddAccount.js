import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import axios from "axios";

export default function AddAccount(props) {
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  const handleSelect = (event) => {
    const selectedRole = event.target.value;
    setRole(selectedRole);
  };

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
          role: role,
        })
        .then((response) => {
          console.log(response);
          alert("Account added succesfully!");
        })
        .catch((error) => {
          console.log(error);
          alert("Email already exists!");
        });
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
      setMessage("Lastname is required");
    } else {
      setMessage("");
    }
  };

  const firstnameValidation = () => {
    if (firstname === "") {
      setMessage("Firstname is required");
    } else {
      setMessage("");
    }
  };

  return (
    <>
      <Navbar logout={props.logout} />
      <div className="acc-container">
        <div className="acc-card">
          <h1 id="acc-h1">Add Account</h1>
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
          <label htmlFor="exampleFormControlSelect1">Role</label>
          <select
            className="form-control"
            id="exampleFormControlSelect1"
            onChange={handleSelect}
          >
            <option value="">Select role</option>
            <option value="ospatar">Waiter</option>
            <option value="barman">Bartender</option>
            <option value="bucatar">Chef</option>
          </select>
          <Button
            type="button"
            className="button1"
            button="Add"
            onClick={() => {
              emailValidation();
              passwordValidation();
              firstnameValidation();
              lastnameValidation();
            }}
          />
        </div>
      </div>
    </>
  );
}
