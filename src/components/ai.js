import { HfInference } from "@huggingface/inference";

const hf = new HfInference("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");

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
`;

export async function getRecipeFromMistral(ingredientsArr) {
  if (!Array.isArray(ingredientsArr) || ingredientsArr.length === 0) {
    throw new Error("Ingredients must be a non-empty array of strings.");
  }

  const ingredientsString = ingredientsArr.join(", ");
  try {
    const response = await hf.chatCompletion({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
        },
      ],
      max_tokens: 1024,
    });

    if (response?.choices?.[0]?.message?.content) {
      return response.choices[0].message.content;
    } else {
      throw new Error("No valid response from the model.");
    }
  } catch (err) {
    console.error(`Error fetching recipe: ${err.message}`);
    throw err;
  }
}
