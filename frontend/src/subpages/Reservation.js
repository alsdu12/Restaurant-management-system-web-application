import Button from "../components/Button";
import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";

export default function Reservation(props) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [persons, setPersons] = useState("");

  const reservation = () => {
    if (!fname || !lname || !date || !time || !persons) {
      alert("All fields are required!");
      return;
    }

    axios
      .post("http://localhost:3001/reservation", {
        fname: fname,
        lname: lname,
        date: date,
        time: time,
        persons: persons,
      })
      .then((response) => {
        console.log(response);
        alert("Reservation sucessfully sent!");
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
        <Navbar logout = {props.logout}/>
      <div className="container1">
        <div className="reservation-card">
          <h1 id="acc-h1">Make a reservation</h1>
          <div className="email1">
            <label for="name">First Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="First name"
              onChange={(e) => {
                setFname(e.target.value);
              }}
            ></input>

            <label for="prenume">Last Name:</label>
            <input
              type="text"
              id="prenume"
              name="prenume"
              required
              placeholder="Last name"
              onChange={(e) => {
                setLname(e.target.value);
              }}
            ></input>

            <label for="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              min={new Date().toISOString().split("T")[0]}
              max="2024-12-12"
              required
              onChange={(e) => {
                setDate(e.target.value);
              }}
            ></input>

            <label for="time">Time:</label>
            <input
              type="time"
              id="time"
              name="time"
              min="12:00"
              max="11:00"
              required
              onChange={(e) => {
                setTime(e.target.value);
              }}
            ></input>

            <label for="guests">Number of persons:</label>
            <input
              type="number"
              id="number"
              name="number"
              required
              min="1"
              max="15"
              onChange={(e) => {
                setPersons(e.target.value);
              }}
            ></input>

            <Button
              type="button"
              className="button1"
              button="Reserve"
              onClick={() => {
                reservation();
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
