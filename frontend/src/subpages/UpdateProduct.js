import React, { useState } from "react";

import Button from "../components/Button";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";

export default function UpdateProduct(props) {
  const location = useLocation();
  const iditem = location.state?.iditem || "";
  const description2 = location.state?.description || "";
  const price2 = location.state?.price || "";
  const image2 = location.state?.image || "";
  const [description, setDescription] = useState(description2);
  const [price, setPrice] = useState(price2);
  const [image, setImage] = useState(image2);

  const updateproduct = () => {
    axios
      .put("http://localhost:3001/updateproduct", {
        id: iditem,
        description: description,
        price: price,
        image: image,
      })
      .then((response) => {
        console.log(response);
        alert("Product updated successfully!");
      })
      .catch((error) => console.error(error));
  };
  console.log(props.description);
  return (
    <>
      <Navbar logout={props.logout} />
      <div className="acc-container">
        <div className="acc-card1">
          <h1 id="acc-h1">Update product</h1>

          <div className="email1">
            <label htmlFor="description">Description</label>
            <input
              defaultValue={description2}
              type="text"
              placeholder="Description"
              id="description"
              name="description"
              className="input1"
              onChange={(e) => {
                setDescription(e.target.value || description2);
              }}
            ></input>

            <label htmlFor="price">Price</label>
            <input
              defaultValue={price2}
              type="text"
              placeholder="Price"
              id="price"
              name="price"
              className="input1"
              onChange={(e) => {
                setPrice(e.target.value || price2);
              }}
            ></input>
            <label htmlFor="image">Image (URL)</label>
            <input
              defaultValue={image2}
              type="text"
              placeholder="URL"
              id="image"
              name="image"
              className="input1"
              onChange={(e) => {
                setImage(e.target.value || image2);
              }}
            ></input>

            <Button
              type="button"
              className="button1"
              button="Update"
              onClick={() => {
                updateproduct();
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
