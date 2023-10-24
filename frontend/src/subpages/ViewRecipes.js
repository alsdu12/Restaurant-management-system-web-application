import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";

export default function ViewRecipes(props) {
  const [recipe, setRecipe] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.selectedCocktail) {
      setRecipe(location.state.selectedCocktail);
    }
  }, [location.state]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const { strInstructions } = recipe;
  const { strDrinkThumb } = recipe;
  const { strDrink } = recipe;
  const { strGlass } = recipe;

  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const ingredientName = recipe[`strIngredient${i}`];
    const ingredientMeasure = recipe[`strMeasure${i}`];
    if (ingredientName && ingredientMeasure) {
      ingredients.push({ name: ingredientName, measure: ingredientMeasure });
    }
  }

  return (
    <>
      <Navbar logout={props.logout} />
      <div className="acc-container-recipes2">
        <div className="cocktails-recipe-card">
          <h2>{strDrink}</h2>
          <div className="recipe-card">
            <div className="column-instructions">
              <h4>Instructions</h4>
              <p>{strInstructions}</p>
              <h4>Ingredients</h4>
              <ul>
                {ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.name} - {ingredient.measure}
                  </li>
                ))}
              </ul>
              <h4>Glass</h4>
              {strGlass}
            </div>
            <img src={strDrinkThumb} alt={strDrink} />
          </div>
        </div>
      </div>
    </>
  );
}
