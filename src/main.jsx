import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./routes/NavBar";
import DetailView from "./routes/DetailView";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index={true} path="/" element={<App />} />
          <Route
            index={true}
            path="/recipeDetails/:id"
            element={<DetailView />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);