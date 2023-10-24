import Button from "../components/Button";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function FoodRecipes(props) {
  const [searchText, setSearchText] = useState("");
  const [meals, setMeals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [mealsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(true);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setCurrentPage(1);
  };

  const navigate = useNavigate();

  const handleUserClick = (path, meal) => {
    navigate(path, { state: { selectedMeal: meal } });
  };

  useEffect(() => {
    const fetchMealsForLetter = async (letter) => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
        );
        const data = response.data.meals || [];

        return data;
      } catch (error) {
        console.error(error);
        return [];
      }
    };
    
    const fetchAllMeals = async () => {
      const cachedMeals = localStorage.getItem("meals");
      if (cachedMeals) {
        setMeals(JSON.parse(cachedMeals));
        setIsLoading(false); // Setează starea de încărcare la false după ce datele sunt încărcate din cache
      } else {
        const allMeals = [];
        setIsLoading(true); // Setează starea de încărcare înainte de a face cererile către API

        for (let letter = 97; letter <= 122; letter++) {
          const mealsForLetter = await fetchMealsForLetter(
            String.fromCharCode(letter)
          );
          if (mealsForLetter.length > 0) {
            allMeals.push(...mealsForLetter);
          }
        }
        setMeals(allMeals);
        localStorage.setItem("meals", JSON.stringify(allMeals));
        setIsLoading(false); // Setează starea de încărcare la false după ce datele sunt încărcate din API
      }
    };

    fetchAllMeals();
  }, []);

  const handleViewRecipe = (mealId) => {
    const selectedMeal = meals.find((meal) => meal.idMeal === mealId);

    if (selectedMeal) {
      console.log(selectedMeal);
    }
  };

  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;

  const filteredMeals = meals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(searchText.toLowerCase())
  );

  const currentMeals = filteredMeals.slice(indexOfFirstMeal, indexOfLastMeal);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
       <Navbar logout = {props.logout}/>

      <div className="acc-container-food-recipes">
        <h1 id="recipes-h1">Recipes</h1>
        <div className="search-api">
          <input
            placeholder="Search"
            type="text"
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>
        {isLoading && meals.length === 0 ? ( // Verifică starea de încărcare și dacă lista de mese este goală
          <div>Loading...</div> // Afișează "Loading" doar când este în curs de încărcare și nu există mese
        ) : (
          currentMeals.map((meal) => (
            <div className="recipes-card" key={meal.idMeal}>
              <div className="cocktails">
                <h4>{meal.strMeal}</h4>
              </div>
              <Button
                className="btn btn-secondary"
                button="View recipe"
                id="recipes-btn"
                onClick={() => {
                  handleViewRecipe(meal.idDrink);
                  handleUserClick("/view-food-recipe", meal);
                }}
              />
            </div>
          ))
        )}

        <div className="pagination">
          {Array.from({
            length: Math.ceil(filteredMeals.length / mealsPerPage),
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
