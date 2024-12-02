import React from "react";
import IngredientsList from "./components/IngredientsList";
import Header from "./Header";

export default function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <IngredientsList />
      </main>
      <footer>
        <p>Powered by AI using Hugging Face's inference API</p>
      </footer>
    </div>
  );
}
