import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import axios from "axios";

export default function BarmanOrders(props) {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/order")
  //     .then((response) => {
  //       setOrders(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       alert("Error fetching orders");
  //     });
  // }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3001/order")
      .then((response) => {
        const fetchedOrders = response.data;
        // Verificați dacă există stări salvate în local storage pentru comenzile existente
        fetchedOrders.forEach((order) => {
          const storedOrder = localStorage.getItem(`order_${order.idorder}`);
          if (storedOrder) {
            const parsedOrder = JSON.parse(storedOrder);
            if (parsedOrder.completed) {
              order.completed = true;
            }
          }
        });
        setOrders(fetchedOrders);
      })
      .catch((error) => {
        alert("Error fetching orders");
      });
  }, []);

  const handleUserClick = (path) => {
    navigate(path);
  };

  const markOrderAsDone = (orderId) => {
    if (!orderId) {
      console.error("Invalid orderId");
      return;
    }

    axios
      .put(`http://localhost:3001/order/${orderId}`, {
        bartenderId: 1,
      })
      .then((response) => {
        // ...
        setOrders((prevOrders) =>
          prevOrders.map((order) => {
            if (order.idorder === orderId) {
              const updatedOrder = { ...order, completed: true };

              localStorage.setItem(
                `order_${orderId}`,
                JSON.stringify(updatedOrder)
              );
              return updatedOrder;
            }
            return order;
          })
        );
      })
      .catch((error) => {
        console.error(`Error marking order ${orderId} as done:`, error);
      });
  };

  return (
    <>
      <Navbar logout={props.logout} />
      <div className="barman-orders">
        <h1 id="orders">Orders</h1>

        <table className="table-order-barman">
          <thead>
            <tr>
              <th>Products</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => {
              const filteredItems = order.items.filter(
                (item) => item.category === "drinks"
              );

              if (filteredItems.length === 0) {
                return null;
              }

              const isOrderCompleted = order.completed;
              console.log(isOrderCompleted);
              return (
                <tr id="border" key={order.id}>
                  <td>
                    {filteredItems.map((item, index) => (
                      <div key={index}>
                        {item.description} - {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td>{order.time}</td>

                  <td>
                    {isOrderCompleted ? (
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
