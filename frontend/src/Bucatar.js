import Button from "./components/Button";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function Bucatar(props) {
  const navigate = useNavigate();

  const handleUserClick = (path) => {
    navigate(path);
  };
  return (
    <>
      <Navbar logout={props.logout} />
      <div className="container-bucatar">
        <div className="flex-adm">
          <Button
            button="Recipes"
            className="admin-btn"
            onClick={() => handleUserClick("/food-recipes")}
          />
          <Button
            button="Orders"
            className="admin-btn"
            onClick={() => handleUserClick("/bucatar-orders")}
          />
          <Button
            button="Food&Desserts"
            className="admin-btn"
            onClick={() => handleUserClick("/bucatar-food")}
          />
        </div>
      </div>
    </>
  );
}
