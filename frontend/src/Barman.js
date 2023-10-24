import Button from "./components/Button";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function Barman(props) {
  const navigate = useNavigate();

  const handleUserClick = (path) => {
    navigate(path);
  };
  return (
    <>
      <Navbar logout={props.logout} />
      <div className="container-barman">
        <div className="flex-adm">
          <Button
            button="Recipes"
            className="admin-btn"
            onClick={() => handleUserClick("/drinks-recipes")}
          />
          <Button
            button="Orders"
            className="admin-btn"
            onClick={() => handleUserClick("/barman-orders")}
          />
          <Button
            button="Drinks"
            className="admin-btn"
            onClick={() => handleUserClick("/barman-drinks")}
          />
        </div>
      </div>
    </>
  );
}
