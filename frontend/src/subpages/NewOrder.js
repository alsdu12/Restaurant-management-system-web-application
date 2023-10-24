import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Button from "../components/Button";
import CardOrder from "../components/CardOrder";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function NewOrder(props) {
  const [food, setFood] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [deserts, setDeserts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState("");
  const [tableValue, setTableValue] = useState("");

  const navigate = useNavigate();

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

  useEffect(() => {
    if (cartItems.length === 0) {
      setCurrentPage(1); // Reset the current page when the cart items become empty
    }
  }, [cartItems]);

  const filterProducts = (product) => {
    return product.description.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const getPaginatedItems = (items) => {
    const startIndex = (currentPage - 1) * 9;
    const endIndex = startIndex + 9;
    return items.slice(startIndex, endIndex);
  };

  const getAllItems = () => {
    const filteredItems = [...food, ...drinks, ...deserts].filter(
      filterProducts
    );
    return filteredItems;
  };

  const currentItems = getPaginatedItems(getAllItems().filter(filterProducts));

  const handleChangeQuantity = (e, productId) => {
    const quantity = parseInt(e.target.value);
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === productId ? { ...item, quantity: quantity } : item
      )
    );

    const updatedTotalPrice = cartItems.reduce((total, item) => {
      if (item.id === productId) {
        return total + item.price * quantity;
      } else {
        return total + item.price * item.quantity;
      }
    }, 0);

    setTotalPrice(updatedTotalPrice);
  };

  const removeFromCart = (product) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => item.id !== product.id
      );
      const updatedTotalPrice = updatedCartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
      setTotalPrice(updatedTotalPrice);
      return updatedCartItems;
    });
  };

  const addToCart = (product) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      const newProduct = { ...product, quantity: 1 };
      setCartItems((prevCartItems) => [...prevCartItems, newProduct]);
    }

    setTotalPrice(totalPrice + product.price);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handlePopupSubmit = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");

    // Extract the relevant information from cartItems
    const itemsArray = cartItems.map((item) => ({
      description: item.description,
      quantity: item.quantity,
      category: item.category,
    }));

    const newOrder = {
      description: descriptionValue,
      table: tableValue,
      price: totalPrice,
      time: hours + ":" + minutes,
      items: JSON.stringify(itemsArray),
    };

    // Make the POST request to add the order
    axios
      .post("http://localhost:3001/orders", newOrder)
      .then((response) => {
        console.log("Order added successfully");
        // Clear the input values
        setDescriptionValue("");
        setTableValue("");
        setCartItems([]);
        setTotalPrice(0);
        setShowPopup(false);
      })
      .catch((error) => {
        console.error("Error adding order:", error);
      });
  };

  const handleUserClick = (path) => {
    navigate(path);
  };

  return (
    <>
      <Navbar logout={props.logout} />
      <div className="flex-order">
        <div className="cart">
          <div>
            <h2>Order</h2>
            <ol className="ol">
              {cartItems.map((item, index) => (
                <li className="li-arrange" key={item.id}>
                  <span>
                    {item.description} - {item.price} lei
                  </span>
                  <div className="cart-items">
                    <input
                      type="number"
                      id="number1"
                      name="number"
                      defaultValue={item.quantity}
                      required
                      min={1}
                      max={15}
                      onChange={(e) => handleChangeQuantity(e, item.id)}
                    />
                    <Button
                      button="Delete"
                      className="btn btn-danger"
                      onClick={() => removeFromCart(item)}
                    />
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="order-submit">
            <p>Total Price: {totalPrice} lei</p>
            <Button
              button="Submit"
              className="btn btn-success"
              onClick={() => setShowPopup(true)}
            />
          </div>
        </div>
        <div className="container-order">
          <div className="search-api1">
            <input
              type="text"
              placeholder="Search by description"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {currentItems.map((item) => (
            <CardOrder
              key={item.id}
              cardWidth="60%"
              cardHeight="340px"
              id={item.id}
              src={item.img}
              description={item.description}
              category={item.category}
              price={item.price}
              food={food}
              setFood={setFood}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              cartItems={cartItems}
            />
          ))}

          <div className="pagination-container">
            <div className="pagination">
              {Array.from({
                length: Math.ceil(getAllItems().length / 9),
              }).map((_, index) => (
                <Button
                  key={index}
                  className={`pagination-button ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                  button={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  disabled={currentPage === index + 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Popup */}
      <Modal show={showPopup} onHide={handlePopupClose}>
        <Modal.Header closeButton>
          <Modal.Title>Submit Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type="text"
                value={descriptionValue}
                onChange={(e) => setDescriptionValue(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Table Number:</Form.Label>
              <Form.Control
                type="text"
                value={tableValue}
                onChange={(e) => setTableValue(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            button="Close"
            className="btn btn-secondary"
            onClick={handlePopupClose}
          />
          <Button
            className="btn btn-primary"
            button="Submit"
            onClick={() => {
              handlePopupSubmit();
              handleUserClick("/orders");
            }}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
}
