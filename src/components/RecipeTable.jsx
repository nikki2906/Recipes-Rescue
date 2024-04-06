import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Slider from '@mui/material/Slider';

const RecipeTable = ({ recipeList }) => {
  const [cookTime, setCookTime] = useState(10); 
  const [searchInput, setSearchInput] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(null);

  const changeCookTime = (event, newValue) => {
    setCookTime(newValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Filter the recipes based on the cook time and search input
    const filteredByTime = Object.values(recipeList.recipes).filter(
      recipe => recipe.readyInMinutes <= cookTime
    );
    const filteredBySearch = filteredByTime.filter(
      recipe => recipe.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    setFilteredRecipes(filteredBySearch);
  };

  useEffect(() => {
    if (!searchInput) {
      // If search input is empty, set filtered recipes to all recipes
      setFilteredRecipes(Object.values(recipeList.recipes));
    } else {
      // Filter recipes based on search input
      const filteredBySearch = Object.values(recipeList.recipes).filter(
        recipe => recipe.title.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredRecipes(filteredBySearch);
    }
  }, [recipeList.recipes, searchInput]);

  return (
    <div className="recipe-table">
      <form onSubmit={handleSubmit} className="submit-form">
        <div className="search-submit-container">
          <div className="search">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
          </div>
          <div className="cook-time-slider">
            <label className="cook-time-slider">
              Cook time (between 10 and 60 minutes):
            </label>
            <Slider
              id="cook-time-slider"
              value={cookTime}
              onChange={changeCookTime}
              aria-label="Cook time slider"
              min={10}
              max={60}
              valueLabelDisplay="auto"
            />
          </div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <div className="scrollable-container">
        <div className="recipe-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Cooking Time</th>
                <th>Health Rating</th>
                <th>Cuisine Type</th>
                <th>Image</th>
                <th>Recipe Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecipes && filteredRecipes.map(recipe => (
                <tr key={recipe.id}>
                  <td className="cell">{recipe.title}</td>
                  <td className="cell">{recipe.readyInMinutes} minutes</td>
                  <td className="cell">{recipe.healthScore}</td>
                  <td className="cell">{recipe.cuisines}</td>
                  <td className="cell">
                    <img
                      src={recipe.image}
                      alt={"Image of a " + recipe.title + " recipe"}
                    />
                  </td>
                  <td className="cell">
                    <Link to={`/RecipeDetails/${recipe.id}`}>
                      🔗
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecipeTable;