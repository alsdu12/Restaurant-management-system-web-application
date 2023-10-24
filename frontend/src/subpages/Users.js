import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Users(props) {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const handleLinkClick = (path) => {
    navigate(path);
  };

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

  const handleDeleteUser = (id) => {
    axios
      .delete(`http://localhost:3001/users/${id}`)
      .then(() => {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
        alert("User deleted successfully");
      })
      .catch((error) => {
        console.error(error);
        alert("Error deleting user");
      });
  };

  return (
    <div className="container-users">
       <Navbar logout = {props.logout}/>
      <div className="users-nav"> 
      
          <Button
          button="Add user"
          onClick={() => handleLinkClick("/add-account")}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Button
                  className="btn btn-danger"
                  button="Delete"
                  onClick={() => handleDeleteUser(user.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
