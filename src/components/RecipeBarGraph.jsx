import React, { Component, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label,
} from "recharts";

const RecipeBarChart = ({ recipeList }) => {
  const cleanData = () => {
    let recipeNum = 1;
    let filteredData = [];
    for (let i = 0; i < Object.keys(recipeList.recipes).length; i++) {
      console.log(recipeList.recipes[i].pricePerServing);

      filteredData.push({
        recipeNum: recipeNum,
        "price per serving": recipeList.recipes[i].pricePerServing,
      });
      recipeNum++;
    }

    return filteredData;
  };

  return (
    <div>
      {recipeList ? ( // rendering only if data is in the useState
        <div>
          <br></br>
          <h2>Price Per Serving for Each Recipe</h2>

          <BarChart
            width={600}
            height={500}
            data={cleanData()}
            margin={{
              top: 10,
              right: 30,
              left: 20,
              bottom: 30,
            }}
          >
            <Bar barSize={30} dataKey="price per serving" fill="#646cff" />
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="recipeNum" interval={1} angle={0} dx={20}>
              <Label value="Recipe" offset={-10} position="insideBottom" />
            </XAxis>


            <YAxis
              label={{
                value: "Price Per Serving",
                angle: -90,
                position: "insideLeft",
                textAnchor: "middle",
              }}
            />
            <Tooltip />
          </BarChart>
        </div>
      ) : null}
    </div>
  );
};

export default RecipeBarChart;