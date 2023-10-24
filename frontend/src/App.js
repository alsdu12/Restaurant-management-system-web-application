import logo from "./logo.svg";
import "./App.css";

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Ospatar from "./Ospatar";
import Barman from "./Barman";
import Bucatar from "./Bucatar";
import { Navigate } from "react-router-dom";
import AddAccount from "./subpages/AddAccount";
import Admin from "./Admin";
import Menu from "./subpages/Menu";
import Users from "./subpages/Users";
import Food from "./subpages/Food";
import AddProduct from "./subpages/AddProduct";
import Drinks from "./subpages/Drinks";
import Deserts from "./subpages/Deserts";
import UpdateProduct from "./subpages/UpdateProduct";
import LoggedUser from "./LoggedUser";
import ClientMenu from "./subpages/ClientMenu";
import Contact from "./subpages/Contact";
import Reservation from "./subpages/Reservation";
import ClientFood from "./subpages/ClientFood";
import ClientDrinks from "./subpages/ClientDrinks";
import ClientDeserts from "./subpages/ClientDeserts";
import Statistics from "./subpages/Statistics";
import DrinksRecipes from "./subpages/DrinksRecipes";
import AddDrinkBarman from "./subpages/AddDrinkBarman";
import BarmanDrinks from "./subpages/BarmanDrinks";
import ViewRecipes from "./subpages/ViewRecipes";
import BucatarFood from "./subpages/BucatarFood";
import AddFoodBucatar from "./subpages/AddFoodBucatar";
import FoodRecipes from "./subpages/FoodRecipes";
import ViewFoodRecipe from "./subpages/ViewFoodRecipe";
import OspatarReserv from "./subpages/OspatarReserv";
import Order from "./subpages/Order";
import NewOrder from "./subpages/NewOrder";
import BucatarOrders from "./subpages/BucatarOrders";
import BarmanOrders from "./subpages/BarmanOrders";
import { useEffect } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/admin"
            element={token ? <Admin /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/users"
            element={token ? <Users /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/add-product"
            element={token ? <AddProduct /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/add-account"
            element={token ? <AddAccount /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/update"
            element={token ? <UpdateProduct /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/statistics"
            element={token ? <Statistics /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/menu"
            element={token ? <Menu /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/food"
            element={token ? <Food /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/drinks"
            element={token ? <Drinks /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/desert"
            element={token ? <Deserts /> : <Navigate to="/" />}
          ></Route>
          <Route path="/register" element={<Register />}></Route>

          <Route
            path="/ospatar"
            element={token ? <Ospatar /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/barman"
            element={token ? <Barman /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/bucatar"
            element={token ? <Bucatar /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/loggeduser"
            element={token ? <LoggedUser /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/client-menu"
            element={token ? <ClientMenu /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/client-food"
            element={token ? <ClientFood /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/client-drinks"
            element={token ? <ClientDrinks /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/client-deserts"
            element={token ? <ClientDeserts /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/client-contact"
            element={token ? <Contact /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/client-reservation"
            element={token ? <Reservation /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/drinks-recipes"
            element={token ? <DrinksRecipes /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/add-drink"
            element={token ? <AddDrinkBarman /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/barman-drinks"
            element={token ? <BarmanDrinks /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/view-recipe"
            element={token ? <ViewRecipes /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/view-food-recipe"
            element={token ? <ViewFoodRecipe /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/logout"
            element={token ? <Login /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/bucatar-food"
            element={token ? <BucatarFood /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/bucatar-add-food"
            element={token ? <AddFoodBucatar /> : <Navigate to="/" />}
          ></Route>

          <Route
            path="/food-recipes"
            element={token ? <FoodRecipes /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/ospatar-reservation"
            element={token ? <OspatarReserv /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/orders"
            element={token ? <Order /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/new-order"
            element={token ? <NewOrder /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/bucatar-orders"
            element={token ? <BucatarOrders /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/barman-orders"
            element={token ? <BarmanOrders /> : <Navigate to="/" />}
          ></Route>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
