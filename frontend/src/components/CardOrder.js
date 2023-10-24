import React, { useState, useEffect } from "react";
import Button from "./Button";
import axios from "axios";

import { useNavigate } from "react-router-dom";

export default function CardOrder(props) {
  const navigate = useNavigate();
  const [added, setAdded] = useState(false); // State to track if the item is added to the cart
  const [removed, setRemoved] = useState(false); // State to track if the item is removed from the cart

  useEffect(() => {
    if (props.cartItems && props.cartItems.length > 0) {
      const isItemAdded = props.cartItems.some((item) => item.id === props.id);
      setAdded(isItemAdded);
      setRemoved(false); // Reset the removed state when the cart items change
    } else {
      setAdded(false); // Reset the added state when the cart items are empty
      setRemoved(false); // Reset the removed state when the cart items are empty
    }
  }, [props.cartItems, props.id]);

  const handleAddToCart = () => {
    props.addToCart(props);
    setAdded(true); // Set added to true when the item is added to the cart
    setRemoved(false); // Reset the removed state when adding the item
  };

  const handleRemoveFromCart = () => {
    props.removeFromCart(props);
    setAdded(false); // Set added to false when the item is removed from the cart
    setRemoved(true); // Set removed to true when the item is removed
  };

  return (
    <div
      className="order-card"
      style={{ width: props.cardWidth, height: props.cardHeight }}
    >
      <div className="flex-order">
        <p>
          {props.description} - {props.price} lei
        </p>
      </div>
      <Button
        className={`btn ${
          added && !removed ? "btn-secondary order-added" : "btn-success"
        }`}
        button={added && !removed ? "Added" : "Add"}
        id="order-btn"
        onClick={added && !removed ? handleRemoveFromCart : handleAddToCart}
        disabled={added && removed}
      />
    </div>
  );
}
