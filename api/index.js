export default function handler(req, res) {
  res.type('html').send(`
    <html>
      <head><title>Chef AI Backend</title></head>
      <body style="font-family: sans-serif; max-width: 800px; margin: 40px auto; padding: 20px;">
        <h1>🍳 Chef Claude Backend</h1>
        <p>The backend is running on Vercel serverless functions!</p>
        <h2>Available Endpoints:</h2>
        <ul>
          <li><strong>Health Check:</strong> <a href="/api/health">/api/health</a></li>
          <li><strong>Generate Recipe:</strong> POST <code>/api/recipe</code>
            <br><small>Send JSON: <code>{ "ingredients": ["ingredient1", "ingredient2"] }</code></small>
          </li>
        </ul>
        <hr>
        <p><a href="/">← Back to Chef Claude</a></p>
      </body>
    </html>
  `);
}
