import React, { useEffect, useState } from "react";
import Button from "./components/Button";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
export default function LoggedUser(props) {
  const navigate = useNavigate();

  const handleUserClick = (path) => {
    navigate(path);
  };
  return (
    <div className="container-admin">
       <Navbar logout = {props.logout}/>
      
      <div className="flex-adm">
        <Button
          button="Menu"
          className="admin-btn"
          onClick={() => handleUserClick("/client-menu")}
        />
        <Button
          button="Reservation"
          className="admin-btn"
          onClick={() => handleUserClick("/client-reservation")}
        />
        <Button
          button="Where you can find us"
          className="admin-btn"
          onClick={() => handleUserClick("/client-contact")}
        />
      </div>
    </div>
  );
}
