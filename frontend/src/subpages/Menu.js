import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Menu(props) {
  const navigate = useNavigate();

  const handleUserClick = (path) => {
    navigate(path);
  };
  return (
    <div className="container-admin">
        <Navbar logout = {props.logout}/>
      <div className="flex-adm">
        <Button
          button="Food"
          className="admin-btn"
          onClick={() => handleUserClick("/food")}
        />
        <Button
          button="Drinks"
          className="admin-btn"
          onClick={() => handleUserClick("/drinks")}
        />
        <Button
          button="Desserts"
          className="admin-btn"
          onClick={() => handleUserClick("/desert")}
        />
      </div>
    </div>
  );
}
