import React from "react";
import dish from "../images/dish.png";
import logout from "../images/logout.png";
import { useNavigate } from "react-router-dom";

export default function Navbar(props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };
  return (
    <div className="navbar1">
      <div className="logo-title">
        <h3>SpiceFusion</h3>
        <img src={dish} alt="dish" id="dish"></img>
      </div>
      <div className="logout" onClick={handleLogout}>
        <h6>LOGOUT</h6>
        <img src={logout} alt="logout" id="logout"></img>
      </div>
    </div>
  );
}
