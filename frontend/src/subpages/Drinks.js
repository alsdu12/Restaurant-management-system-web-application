import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Drinks(props) {
  const [drinks, setDrinks] = useState([]);
  const navigate = useNavigate();
  const handleLinkClick = (path) => {
    navigate(path);
  };
  useEffect(() => {
    axios
      .get("http://localhost:3001/drinks")
      .then((response) => {
        setDrinks(response.data);
      })
      .catch((error) => {
        console.error(error);
        alert("Error fetching drinks");
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

      {drinks.map((item) => (
        <Card
          cardWidth="250px"
          cardHeight="480px"
          id={item.id}
          src={item.img}
          maxWidth="210px"
          maxHeight="180px"
          description={item.description}
          category={item.category}
          price={item.price}
          food={drinks}
          setFood={setDrinks}
        />
      ))}
    </div>
  );
}
