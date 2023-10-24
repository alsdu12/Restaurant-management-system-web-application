import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Navbar from "../components/Navbar";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Statistics(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
        alert("Error fetching users");
      });
  }, []);

  const getUsersByRole = (role) => {
    return users.filter((user) => user.role === role).length;
  };

  const utilizatori = [
    getUsersByRole("barman"),
    getUsersByRole("ospatar"),
    getUsersByRole("bucatar"),
    getUsersByRole("user"),
  ];

  const data = {
    labels: ["Bartenders", "Waiters", "Chefs", "Users"],
    datasets: [
      {
        data: utilizatori,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "grey"],
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        type: "category", // Specify category scale for x-axis
      },
    },
  };

  return (
    <>
        <Navbar logout = {props.logout}/>
      <div className="container-statistics">
        <div className="contact-card">
          <h1 id="chart">Users</h1>
          <div className="chart">
            <Pie data={data} />
          </div>
        </div>
      </div>
    </>
  );
}
