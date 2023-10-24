import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Deserts(props) {
  const [deserts, setDeserts] = useState([]);
  const navigate = useNavigate();
  const handleLinkClick = (path) => {
    navigate(path);
  };
  useEffect(() => {
    axios
      .get("http://localhost:3001/desert")
      .then((response) => {
        setDeserts(response.data);
      })
      .catch((error) => {
        console.error(error);
        alert("Error fetching deserts");
      });
  }, []);

  return (
    <div className="container2">
      <Navbar logout={props.logout} />
      <div className="width">
        <Button
          className="button1"
          button="Add product"
          onClick={() => handleLinkClick("/add-product")}
        />
      </div>
      {deserts.map((item) => (
        <Card
          cardWidth="250px"
          cardHeight="470px"
          id={item.id}
          description={item.description}
          src={item.img}
          category={item.category}
          price={item.price}
          food={deserts}
          setFood={setDeserts}
        />
      ))}
    </div>
  );
}
