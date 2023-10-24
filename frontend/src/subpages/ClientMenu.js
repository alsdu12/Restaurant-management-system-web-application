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
          onClick={() => handleUserClick("/client-food")}
        />
        <Button
          button="Drinks"
          className="admin-btn"
          onClick={() => handleUserClick("/client-drinks")}
        />
        <Button
          button="Deserts"
          className="admin-btn"
          onClick={() => handleUserClick("/client-deserts")}
        />
      </div>
    </div>
  );
}
