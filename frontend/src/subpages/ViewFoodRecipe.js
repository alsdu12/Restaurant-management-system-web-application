import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";

export default function ViewFoodRecipe(props) {
  const [recipe, setRecipe] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.selectedMeal) {
      setRecipe(location.state.selectedMeal);
    }
  }, [location.state]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const { strInstructions } = recipe;
  const { strMealThumb } = recipe;
  const { strMeal } = recipe;
  const { strCategory } = recipe;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredientName = recipe[`strIngredient${i}`];
    const ingredientMeasure = recipe[`strMeasure${i}`];
    if (ingredientName && ingredientMeasure) {
      ingredients.push({ name: ingredientName, measure: ingredientMeasure });
    }
  }

  return (
    <>
        <Navbar logout = {props.logout}/>
      <div className="acc-container-food-recipes2">
        <div className="food-recipe-card">
          <h2>{strMeal}</h2>
          <div className="recipe-food-card">
            <div className="instructions">
              <h4>Instructions</h4>
              <p>{strInstructions}</p>
            </div>
            <div className="ingredients-image">
              <div>
                <h4>Ingredients</h4>
                <ul>
                  {ingredients.map((ingredient, index) => (
                    <li key={index}>
                      {ingredient.name} - {ingredient.measure}
                    </li>
                  ))}
                </ul>
                <h4>Category</h4>
                {strCategory}
              </div>
              <img src={strMealThumb} alt={strMeal} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
