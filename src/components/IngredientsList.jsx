import React, { useState } from "react";
import { getRecipeFromAI } from "./ai";
import Recipe from "./ClaudeRecipe";

export default function IngredientsList() {
  const [ingredients, setIngredients] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddIngredient = () => {
    if (inputValue.trim()) {
      setIngredients([...ingredients, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeIngredient = (indexToRemove) => {
    setIngredients((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const handleFetchRecipe = async () => {
    setLoading(true);
    setError("");
    try {
      const generatedRecipe = await getRecipeFromAI(ingredients);
      setRecipe(generatedRecipe);
    } catch (err) {
      setError("Failed to generate recipe. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="hero-section">
        <div className="powered-badge">
          <svg className="sparkle-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L14.09 8.26L20 10L14.09 11.74L12 18L9.91 11.74L4 10L9.91 8.26L12 2Z" fill="currentColor"/>
            <path d="M5 3L5.5 4.5L7 5L5.5 5.5L5 7L4.5 5.5L3 5L4.5 4.5L5 3Z" fill="currentColor"/>
            <path d="M19 17L19.5 18.5L21 19L19.5 19.5L19 21L18.5 19.5L17 19L18.5 18.5L19 17Z" fill="currentColor"/>
          </svg>
          Powered by AI
        </div>
        <h2 className="hero-title">Transform Your Ingredients into Delicious Recipes</h2>
        <p className="hero-description">
          Simply add the ingredients you have on hand, and let our AI chef create amazing recipes for you. 
          Perfect for reducing food waste and discovering new dishes!
        </p>
      </section>

      <section className="ingredients-card">
        <h3 className="card-title">What ingredients do you have?</h3>
        <p className="card-subtitle">Add ingredients one by one. Press Enter or click the + button to add each ingredient.</p>
        
        <form
          className="add-ingredient-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddIngredient();
          }}
        >
          <input
            type="text"
            placeholder="e.g., chicken, tomatoes, garlic..."
            aria-label="Add an ingredient"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="add-btn">+</button>
        </form>

        {ingredients.length > 0 && (
          <ul className="ingredients-list" aria-live="polite">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="chip">
                <span>{ingredient}</span>
                <button
                  type="button"
                  aria-label={`Remove ${ingredient}`}
                  onClick={() => removeIngredient(index)}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="get-recipe-container">
          <button
            className="btn btn-gradient btn-lg"
            onClick={handleFetchRecipe}
            disabled={loading || ingredients.length === 0}
          >
            {loading ? (
              <>
                <span className="spinner" aria-hidden="true" />
                Generating...
              </>
            ) : (
              <>
                <svg className="sparkle-icon-btn" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L14.09 8.26L20 10L14.09 11.74L12 18L9.91 11.74L4 10L9.91 8.26L12 2Z" fill="currentColor"/>
                </svg>
                Generate Recipe
              </>
            )}
          </button>
          {ingredients.length === 0 && (
            <p className="hint-text">Start by adding some ingredients above</p>
          )}
        </div>
        {error && <p className="error" role="alert">{error}</p>}
      </section>

      <Recipe recipe={recipe} />
    </>
  );
}
