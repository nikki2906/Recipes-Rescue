import React, { Component, useEffect, useState } from 'react';
import {
    LineChart,
    Line, 
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Label,
} from "recharts";

const RecipeLineGraph = ({ recipeList }) => {
    const cleanData = (recipeList) => {
        let recipeNum = 1;
        let filteredData = [];
        if (recipeList && recipeList.recipes) {
            for (let i = 0; i < Object.keys(recipeList.recipes).length; i++) {
                filteredData.push({
                    recipeNum: recipeNum,
                    "ready time": recipeList.recipes[i].readyInMinutes,
                });
                recipeNum++;
            }
        }
        return filteredData;
    };
    

    return (
        <div>
        {/* renders a line chart of cooking times for each recipe if recipeList exists */}
        {recipeList ? ( 
            <div>
            <br></br>
            <h2>Cooking times for each recipe</h2>

            <LineChart
                width={600}
                height={500}
                data={cleanData(recipeList)}
                margin={{
                    top: 10,
                    right: 30,
                    left: 20,
                    bottom: 30,
                }}
            >

                <Line type="monotone" dataKey="ready time" stroke="#8884d8" />
                <CartesianGrid strokeDasharray="5 5" />
                
                {/* x-axis represents the recipe number */}
                <XAxis dataKey="recipeNum" interval={1} angle={0} dx={20}>
                <Label value="Recipe" offset={-10} position="insideBottom" />
                </XAxis>

                {/* y-axis represents the ready time */}
                <YAxis
                label={{
                    value: "Ready Time",
                    angle: -90,
                    position: "insideLeft",
                    textAnchor: "middle",
                }}
                />
                <Tooltip />
            </LineChart>
            </div>
            // If recipeList doesn’t exist, nothing is rendered
        ) : null}
        </div>
    );
};

export default RecipeLineGraph;