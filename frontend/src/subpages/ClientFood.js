import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import axios from "axios";
import Carduser from "../components/Carduser";
import Navbar from "../components/Navbar";

export default function ClientFood(props) {
  const [food, setFood] = useState([]);
  const navigate = useNavigate();
  const handleLinkClick = (path) => {
    navigate(path);
  };
  useEffect(() => {
    axios
      .get("http://localhost:3001/food")
      .then((response) => {
        setFood(response.data);
      })
      .catch((error) => {
        console.error(error);
        alert("Error fetching food");
      });
  }, []);

  return (
    <div className="container2">
      <Navbar logout={props.logout} />
      {food.map((item) => (
        <>
          <Carduser
            key={item.id}
            cardWidth="250px"
            cardHeight="350px"
            id={item.id}
            src={item.img}
            description={item.description}
            category={`Category: ${item.category}`}
            price={`Price: ${item.price} lei`}
          />
        </>
      ))}
    </div>
  );
}
