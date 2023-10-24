import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Food(props) {
  const [food, setFood] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
      <div className="width">
        <Button
          className="button1"
          button="Add product"
          onClick={() => handleLinkClick("/add-product")}
        />
      </div>
      {food.map((item) => (
        <>
          <Card
            key={item.id}
            cardWidth="250px"
            cardHeight="470px"
            id={item.id}
            src={item.img}
            description={item.description}
            category={item.category}
            price={item.price}
            food={food}
            setFood={setFood}
          />
        </>
      ))}
    </div>
  );
}
