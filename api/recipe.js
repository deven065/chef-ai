export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { ingredients } = req.body;

  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ error: 'Ingredients must be a non-empty array' });
  }

  const HUGGINGFACE_API_KEY = process.env.VITE_HUGGINGFACE_API_KEY || process.env.HUGGINGFACE_API_KEY;

  if (!HUGGINGFACE_API_KEY) {
    console.error('API key not found. Available env vars:', Object.keys(process.env).filter(k => k.includes('HUG')));
    return res.status(500).json({ error: 'API key not configured' });
  }

  const ingredientsString = ingredients.join(', ');
  const SYSTEM_PROMPT = `You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. 

IMPORTANT: Always include the following information in your recipe:
- Servings (e.g., "Serves: 4" or "Makes 4 servings")
- Cooking/Prep time (e.g., "Time: 30 minutes")
- Difficulty level (Easy, Medium, or Hard)

Format your response in markdown with clear sections for Ingredients and Instructions.`;

  try {
    // Use Hugging Face Router with OpenAI-compatible Chat Completions API
    const routerUrl = 'https://router.huggingface.co/v1/chat/completions';
    const candidates = [
      'meta-llama/Meta-Llama-3.1-8B-Instruct',
      'Qwen/Qwen2.5-7B-Instruct',
      'microsoft/Phi-3.5-mini-instruct',
      'TinyLlama/TinyLlama-1.1B-Chat-v1.0'
    ];

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45000);

    let lastError = null;
    for (const model of candidates) {
      console.log('[HF][chat.completions] POST', routerUrl, 'model:', model);
      try {
        const response = await fetch(routerUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              { role: 'user', content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` }
            ],
            max_tokens: 600,
            temperature: 0.7
          }),
          signal: controller.signal,
        });

        if (response.ok) {
          const data = await response.json();
          const content = data?.choices?.[0]?.message?.content || data?.choices?.[0]?.text;
          const recipe = content || 'No recipe generated';
          clearTimeout(timeout);
          return res.status(200).json({ recipe, model });
        } else {
          const errorData = await response.text();
          console.error('[HF][chat.completions] error', response.status, 'model', model, errorData);
          lastError = { status: response.status, model, error: errorData };
          // Continue to next model
        }
      } catch (err) {
        console.error('[HF][chat.completions] exception for model', model, err?.message || err);
        lastError = { status: 500, model, error: err?.message || String(err) };
      }
    }

    clearTimeout(timeout);
    if (lastError) {
      return res.status(502).json({ error: 'All candidate models failed', details: lastError });
    }
    return res.status(500).json({ error: 'Unknown error contacting HuggingFace' });
  } catch (error) {
    console.error('[HF] outer failure:', error);
    res.status(500).json({ error: 'Failed to fetch recipe from HuggingFace' });
  }
}
