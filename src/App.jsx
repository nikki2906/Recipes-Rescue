import { useState, useEffect } from "react";
import "./App.css";
import RecipeTable from "./components/RecipeTable";
import Cards from "./components/Cards";
import RecipeLineGraph from "./components/RecipeLineGraph";
import RecipeBarGraph from "./components/RecipeBarGraph";


const apiKey = '';

function App() {
  const [recipesCount, setRecipesCount] = useState(0);
  const [setHealthyRecipesCount, setHealthyData] = useState(0);
  const [readyTime, setReadyTime] = useState(0);

  const [searchInput, setSearchInput] = useState("");


  const [recipeList, setRecipeList] = useState(null);
  

  const getNumRecipes = () => {
    setRecipesCount(Object.keys(recipeList.recipes).length);
  };

  const getHealthyRecipes = () => {
    let numHealthy = 0;
    for (let i = 0; i < Object.keys(recipeList.recipes).length; i++) {
      if (recipeList.recipes[i].healthScore >= 10) {
        numHealthy++;
      }
    }
    setHealthyData(numHealthy);
  };

  const getAvgReadyTime = () => {
    let sumReadyTime = 0;
    let avgReadyTime = 0;
    for (let i = 0; i < Object.keys(recipeList.recipes).length; i++) {
      sumReadyTime += recipeList.recipes[i].readyInMinutes;
    }
    avgReadyTime = Math.ceil(
      sumReadyTime / Object.keys(recipeList.recipes).length
    );

    setReadyTime(avgReadyTime);
  };

  useEffect(() => {
    if (recipeList) {
      getNumRecipes();
      getHealthyRecipes();
      getAvgReadyTime();
    }
  }, [recipeList]);


  useEffect(() => {
    const fetchAllRecipeData = async () => {
      const URL = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=25&tags=pescatarian`;
      const response = await fetch(URL);
      const json = await response.json();
      console.log(json.recipes);
      setRecipeList(json);
    };
    fetchAllRecipeData().catch(console.error);
  }, []);

  return (
    <div className="App">
      <div className="page-content">
        <div className="content">
          <div className="statistics">
            <Cards title="Recipe Count" data={recipesCount} />
            <Cards title="Healthy Recipe Count" data={setHealthyRecipesCount} />
            <Cards title="Average Cooking Time" data={readyTime} />
          </div>
          <div className="list card">
           
            {recipeList ? (
              <RecipeTable
                recipeList={recipeList}
                searchInput={searchInput}
              />
            ) : (
              <div className="data_table">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Cooking Time</th>
                      <th>Health Score</th>
                      <th>Source</th>
                      <th>Image</th>
                    </tr>
                    <tr></tr>
                  </thead>
                </table>
              </div>
            )}
          </div>
        </div>
        <div className="chart_content chart_card">
          <RecipeLineGraph recipeList={recipeList} />
          <RecipeBarGraph recipeList={recipeList} />
        </div>
      </div>
    </div>
  );
}

export default App;