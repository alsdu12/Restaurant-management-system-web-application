import React, { useState } from "react";

import Button from "../components/Button";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function AddDrinkBarman(props) {
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const addproduct = () => {
    axios
      .post("http://localhost:3001/addproduct", {
        category: "drinks",
        description: description,
        price: price,
        image: image,
      })
      .then((response) => {
        console.log(response);
        alert("Product added succesfully!");
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
        <Navbar logout = {props.logout}/>
      <div className="acc-container-barman">
        <div className="acc-card-barman">
          <h1 id="acc-h1">Add Product</h1>

          <div className="email1">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              placeholder="Description"
              id="description"
              name="description"
              className="input1"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></input>

            <label htmlFor="price">Price</label>
            <input
              type="text"
              placeholder="Price"
              id="price"
              name="price"
              className="input1"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            ></input>
            <label htmlFor="image">Image (URL)</label>
            <input
              type="text"
              placeholder="URL"
              id="image"
              name="image"
              className="input1"
              onChange={(e) => {
                setImage(e.target.value);
              }}
            ></input>

            <Button
              type="button"
              className="button1"
              button="Add"
              onClick={() => {
                addproduct();
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
