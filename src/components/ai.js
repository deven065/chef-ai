export async function getRecipeFromAI(ingredientsArr) {
  if (!Array.isArray(ingredientsArr) || ingredientsArr.length === 0) {
    throw new Error("Ingredients must be a non-empty array of strings.");
  }

  try {
    const response = await fetch("/api/recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ingredientsArr,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch recipe");
    }

    const data = await response.json();
    return data.recipe;
  } catch (err) {
    console.error(`Error fetching recipe: ${err.message}`);
    throw err;
  }
}
