import React from "react";
import IngredientsList from "./components/IngredientsList";
import Header from "./Header";

export default function App() {
  return (
    <div className="app-container">
      <Header />
      <IngredientsList />
    </div>
  );
}
