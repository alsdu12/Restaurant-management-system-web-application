import React, { useEffect, useState } from "react";
import Button from "./components/Button";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function Admin(props) {
  const navigate = useNavigate();

  const handleUserClick = (path) => {
    navigate(path);
  };
  return (
    <div className="container-admin">
      
      <Navbar/>

      <div className="flex-adm">
        <Button
          button="Users"
          className="admin-btn"
          onClick={() => handleUserClick("/users")}
        />
        <Button
          button="Menu"
          className="admin-btn"
          onClick={() => handleUserClick("/menu")}
        />
        <Button
          button="Statistics"
          className="admin-btn"
          onClick={() => handleUserClick("/statistics")}
        />
      </div>
    </div>
  );
}
