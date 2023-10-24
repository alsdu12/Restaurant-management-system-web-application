import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Button from "../components/Button";

export default function OspatarResev(props) {
  const [reservations, setReservations] = useState([]);

  const deleteReservation = (reservationId) => {
    axios
      .delete(`http://localhost:3001/reservations/${reservationId}`)
      .then((response) => {
        console.log(response);
        // Actualizăm lista de rezervări după ștergere
        setReservations((prevReservations) =>
          prevReservations.filter(
            (reservation) => reservation.idreservation !== reservationId
          )
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/reservations")
      .then((response) => {
        setReservations(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const formatDateString = (isoDateString) => {
    const date = new Date(isoDateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day < 10 ? "0" + day : day}/${
      month < 10 ? "0" + month : month
    }/${year}`;
  };

  return (
    <>
       <Navbar logout = {props.logout}/>
      <div className="ospatar-reservations">
        <h1>Reservation List</h1>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Persons</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.idreservation}>
                <td>{reservation.fname}</td>
                <td>{reservation.lname}</td>
                <td>{formatDateString(reservation.date)}</td>
                <td>{reservation.time}</td>
                <td>{reservation.persons}</td>
                <td>
                  <Button
                    className="btn btn-success"
                    button="OK"
                    onClick={() => deleteReservation(reservation.idreservation)}
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
