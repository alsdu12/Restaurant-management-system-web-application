import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function Order(props) {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/order")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error(error);
        alert("Error fetching orders");
      });

    const storedCompletedOrders = localStorage.getItem("completedOrders");
    if (storedCompletedOrders) {
      setCompletedOrders(JSON.parse(storedCompletedOrders));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("completedOrders", JSON.stringify(completedOrders));
  }, [completedOrders]);

  const handleUserClick = (path) => {
    navigate(path);
  };

  const updateOrderStatus = (orderId, completed) => {
    if (completed && orderId) {
      axios
        .delete(`http://localhost:3001/orderz/${orderId}`)
        .then(() => {
          setOrders((prevOrders) =>
            prevOrders.filter((order) => order.idorder !== orderId)
          );
          setCompletedOrders((prevCompletedOrders) => [
            ...prevCompletedOrders,
            orderId,
          ]);
        })
        .catch((error) => {
          console.error(error);
          alert("Error deleting order");
        });
    }
  };

  const markOrderAsDone = (orderId) => {
    const order = orders.find((order) => order.idorder === orderId);

    if (
      (order && order.bartender === 1 && order.chef === 0) ||
      (order.bartender === 0 && order.chef === 1) ||
      (order.bartender === 0 && order.chef === 0)
    ) {
      alert("The order is not completed!");
    } else {
      setOrders((prevOrders) =>
        prevOrders.map((order) => {
          if (order.idorder === orderId) {
            return { ...order, completed: true };
          }
          return order;
        })
      );
      setCompletedOrders((prevCompletedOrders) => [
        ...prevCompletedOrders,
        orderId,
      ]);
    }
  };

  return (
    <>
      <Navbar logout={props.logout} />
      <div className="ospatar-orders">
        <h1 id="orders">Orders</h1>
        <div className="new-order">
          <Button
            className="button1"
            button="New order"
            onClick={() => handleUserClick("/new-order")}
          />
        </div>
        <table className="table-order">
          <thead>
            <tr>
              <th>Orders</th>
              <th>Description</th>
              <th>Price</th>
              <th>Time</th>
              <th>Table</th>
              <th>Bartender</th>
              <th>Chef</th>
              <th>Actions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr id="border" key={order.id}>
                <td>
                  {order.items.map((item, index) => (
                    <div key={index}>{item.description}</div>
                  ))}
                </td>
                <td>{order.description}</td>
                <td>{order.price}</td>
                <td>{order.time}</td>
                <td>{order.table_no}</td>
                {order.items.every(
                  (item) =>
                    item.category === "food" || item.category === "deserts"
                ) ? (
                  <td className="drink-order completed">Completed</td>
                ) : (
                  <td
                    className={order.bartender === 1 ? "completed" : "pending"}
                  >
                    {order.bartender === 1 ? "Completed" : "Pending"}
                  </td>
                )}
                {order.items.every((item) => item.category === "drinks") ? (
                  <td className="drink-order completed">Completed</td>
                ) : (
                  <td className={order.chef === 1 ? "completed" : "pending"}>
                    {order.chef === 1 ? "Completed" : "Pending"}
                  </td>
                )}
                <td>
                  {order.completed ? (
                    <Button
                      className="btn btn-secondary disabled"
                      button="Done"
                      disabled
                    />
                  ) : (
                    <Button
                      className="btn btn-success"
                      button="Done"
                      onClick={() => markOrderAsDone(order.idorder)}
                    />
                  )}
                </td>

                <td>
                  <Button
                    className="btn btn-danger"
                    button="Delete"
                    onClick={() => updateOrderStatus(order.idorder, true)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
