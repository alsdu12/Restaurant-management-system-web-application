import Button from "../components/Button";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DrinksRecipes(props) {
  const [searchText, setSearchText] = useState("");
  const [cocktails, setCocktails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cocktailsPerPage] = useState(8);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setCurrentPage(1);
  };

  const navigate = useNavigate();

  const handleUserClick = (path, cocktail) => {
    navigate(path, { state: { selectedCocktail: cocktail } });
  };

  useEffect(() => {
    const fetchCocktailsForLetter = async (letter) => {
      try {
        const response = await axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`
        );
        return response.data.drinks || [];
      } catch (error) {
        console.error(error);
        return [];
      }
    };

    const fetchAllCocktails = async () => {
      const cachedCocktails = localStorage.getItem("cocktails");
      if (cachedCocktails) {
        setCocktails(JSON.parse(cachedCocktails));
      } else {
        const allCocktails = [];
        for (let letter = 97; letter <= 122; letter++) {
          const cocktailsForLetter = await fetchCocktailsForLetter(
            String.fromCharCode(letter)
          );
          if (cocktailsForLetter.length > 0) {
            allCocktails.push(...cocktailsForLetter);
          }
        }
        setCocktails(allCocktails);

        localStorage.setItem("cocktails", JSON.stringify(allCocktails));
      }
    };

    fetchAllCocktails();
  }, []);

  const handleViewRecipe = (cocktailId) => {
    const selectedCocktail = cocktails.find(
      (cocktail) => cocktail.idDrink === cocktailId
    );

    if (selectedCocktail) {
      console.log(selectedCocktail);
    }
  };

  const indexOfLastCocktail = currentPage * cocktailsPerPage;
  const indexOfFirstCocktail = indexOfLastCocktail - cocktailsPerPage;

  const filteredCocktails = cocktails.filter((cocktail) =>
    cocktail.strDrink.toLowerCase().includes(searchText.toLowerCase())
  );

  const currentCocktails = filteredCocktails.slice(
    indexOfFirstCocktail,
    indexOfLastCocktail
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
       <Navbar logout = {props.logout}/>
      <div className="acc-container-recipes">
        <h1 id="recipes-cock-h1">Recipes</h1>
        <div className="search-api">
          <input placeholder="Search" type="text" value={searchText} onChange={handleSearchChange} />
        </div>
        {currentCocktails.map((cocktail) => (
          <div className="recipes-card" key={cocktail.idDrink}>
            <div className="cocktails">
              <h4>{cocktail.strDrink}</h4>
            </div>
            <Button
              className="btn btn-secondary"
              button="View recipe"
              id="recipes-btn"
              onClick={() => {
                handleViewRecipe(cocktail.idDrink);
                handleUserClick("/view-recipe", cocktail);
              }}
            />
          </div>
        ))}

        <div className="pagination">
          {Array.from({
            length: Math.ceil(filteredCocktails.length / cocktailsPerPage),
          }).map((_, index) => (
            <Button
              key={index}
              className={`pagination-button ${
                currentPage === index + 1 ? "active" : ""
              }`}
              button={index + 1}
              onClick={() => paginate(index + 1)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
