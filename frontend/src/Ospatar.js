import Button from "./components/Button";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Ospatar(props) {
  const navigate = useNavigate();
  const [hasReservations, setHasReservations] = useState(false);

  const handleUserClick = (path) => {
    navigate(path);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/reservations")
      .then((response) => {
        const reservations = response.data;
        setHasReservations(reservations.length > 0);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Navbar logout={props.logout} />
      <div className="container-ospatar">
        <div className="flex-adm">
          <Button
            button="Reservations"
            className={`admin-btn ${hasReservations ? "has-reservations" : ""}`}
            onClick={() => handleUserClick("/ospatar-reservation")}
          />
          <Button
            button="Orders"
            className="admin-btn"
            onClick={() => handleUserClick("/orders")}
          />
        </div>
      </div>
    </>
  );
}
