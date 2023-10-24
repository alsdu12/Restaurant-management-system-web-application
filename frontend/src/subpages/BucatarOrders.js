import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import axios from "axios";

// export default function BucatarOrders(props) {
//   const navigate = useNavigate();
//   const [orders, setOrders] = useState([]);
//   const [completedOrders, setCompletedOrders] = useState([]);

//   useEffect(() => {
//     const storedCompletedOrders = localStorage.getItem("completedOrders");
//     if (storedCompletedOrders) {
//       setCompletedOrders(JSON.parse(storedCompletedOrders));
//     }

//     // Fetch orders from the server
//     axios
//       .get("http://localhost:3001/order")
//       .then((response) => {
//         setOrders(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//         alert("Error fetching orders");
//       });
//   }, []);

//   const markOrderAsDone = (orderId) => {
//     if (!orderId) {
//       console.error("Invalid orderId");
//       return;
//     }

//     axios
//       .put(`http://localhost:3001/orderss/${orderId}`, {
//         chef: 1,
//       })
//       .then((response) => {
//         console.log(`Order ${orderId} marked as done`);

//         // Store the completed order in local storage
//         localStorage.setItem(
//           "completedOrders",
//           JSON.stringify([...completedOrders, orderId])
//         );

//         setOrders((prevOrders) =>
//           prevOrders.map((order) => {
//             if (order.idorder === orderId) {
//               return { ...order, completed: true };
//             }
//             return order;
//           })
//         );
//       })
//       .catch((error) => {
//         console.error(`Error marking order ${orderId} as done:`, error);
//       });
//   };

export default function BucatarOrders(props) {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from the server
    axios
      .get("http://localhost:3001/order")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error(error);
        alert("Error fetching orders");
      });
  }, []);

  useEffect(() => {
    // Retrieve completed order IDs from local storage
    const storedCompletedOrders = localStorage.getItem("completedOrders");
    if (storedCompletedOrders) {
      setCompletedOrders(JSON.parse(storedCompletedOrders));
    }
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
      .put(`http://localhost:3001/orderss/${orderId}`, {
        chef: 1,
      })
      .then((response) => {
        console.log(`Order ${orderId} marked as done`);

        // Update the completedOrders state and store it in local storage
        setCompletedOrders((prevCompletedOrders) => [
          ...prevCompletedOrders,
          orderId,
        ]);
        localStorage.setItem(
          "completedOrders",
          JSON.stringify([...completedOrders, orderId])
        );

        setOrders((prevOrders) =>
          prevOrders.map((order) => {
            if (order.idorder === orderId) {
              return { ...order, completed: true };
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
      <div className="bucatar-orders">
        <h1 id="orders">Orders</h1>

        <table className="table-order">
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
                (item) =>
                  item.category === "food" || item.category === "deserts"
              );

              if (filteredItems.length === 0) {
                return null; // Skip rendering if no food or desserts are present
              }

              const isOrderCompleted =
                order.completed || completedOrders.includes(order.idorder);

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
