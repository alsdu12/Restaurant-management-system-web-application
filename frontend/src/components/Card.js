import React from "react";
import Button from "./Button";
import axios from "axios";

import { useNavigate } from "react-router-dom";

export default function Card(props) {
  const navigate = useNavigate();
  const handleLinkClick = (path) => {
    const data = {
      iditem: props.id,
      description: props.description,
      price: props.price,
      image: props.src,
    };
    navigate(path, { state: data });
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3001/menu/${props.id}`)
      .then(() => {
        const updatedFood = props.food.filter((item) => item.id !== props.id);
        props.setFood(updatedFood);
        alert("Product succesfully deleted!");
      })
      .catch((error) => {
        console.error(error);
        alert("Error! Product has not been deleted!");
      });
  };

  return (
    <div
      className="menu-card"
      style={{ width: props.cardWidth, height: props.cardHeight }}
    >
      <img src={props.src} style={{ maxWidth: props.maxWidth, maxHeight: props.maxHeight }} />

      <p>{props.description}</p>
      <p>Category: {props.category}</p>
      <p>Price: {props.price}</p>
      <Button
        className="btn btn-danger"
        button="Delete"
        id="menu-btn"
        onClick={handleDelete}
      />
      <Button
        className="btn btn-secondary"
        button="Update"
        id="menu-btn"
        onClick={() => handleLinkClick(`/update`)}
        category={props.category}
        description={props.description}
        price={props.price}
        image={props.image}
      />
    </div>
  );
}
