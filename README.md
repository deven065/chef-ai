# 🍳 Chef Claude - AI-Powered Recipe Generator

A modern, full-stack React application that generates personalized recipes using AI based on the ingredients you have on hand. Built with React, Express, and powered by HuggingFace's language models.

![Chef Claude](https://img.shields.io/badge/React-18.3.1-blue)
![Node](https://img.shields.io/badge/Node-20+-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

- 🤖 **AI-Powered Recipe Generation** - Uses HuggingFace's advanced language models (Llama 3.1, Qwen, Phi) with automatic fallback
- 🥘 **Ingredient Management** - Add, remove, and manage your available ingredients with an intuitive chip-based interface
- 📝 **Structured Recipe Cards** - Beautiful recipe display with:
  - Cooking time and servings information
  - Difficulty level indicator
  - Organized ingredients list
  - Step-by-step instructions
- 🎨 **Premium UI/UX** - Clean, professional design with smooth animations and responsive layout
- 🔄 **Smart Recipe Parsing** - Automatically extracts and structures recipe data from AI-generated markdown
- 🌐 **Full-Stack Architecture** - Express backend proxy to handle API calls securely

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ installed
- npm or yarn package manager
- HuggingFace API key (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd chef-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_HUGGINGFACE_API_KEY=your_huggingface_api_key_here
   ```

   **Get your API key:**
   - Visit [HuggingFace Settings](https://huggingface.co/settings/tokens)
   - Create a new access token (Read access is sufficient)
   - Copy and paste it into your `.env` file

4. **Start the application**
   ```bash
   npm start
   ```
   
   This will start both the backend server (port 3001) and frontend dev server (port 5173) concurrently.

5. **Open your browser**
   
   Navigate to [http://localhost:5173](http://localhost:5173)

## 📁 Project Structure

```
chef-ai/
├── public/              # Static assets
├── src/
│   ├── components/
│   │   ├── ai.js                    # AI API integration
│   │   ├── ClaudeRecipe.jsx         # Recipe display component
│   │   └── IngredientsList.jsx      # Ingredients management
│   ├── App.jsx                      # Main app component
│   ├── Header.jsx                   # Header with logo
│   ├── index.css                    # Global styles
│   └── index.jsx                    # App entry point
├── server.js            # Express backend server
├── vite.config.js       # Vite configuration
├── .env                 # Environment variables (create this)
├── .env.example         # Environment template
└── package.json         # Dependencies and scripts
```

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - UI framework
- **Vite 7.3.0** - Build tool and dev server
- **React Markdown 9.0.1** - Markdown rendering for recipes

### Backend
- **Express 5.2.1** - Server framework
- **Node.js** - Runtime environment
- **CORS 2.8.5** - Cross-origin resource sharing
- **dotenv 16.4.5** - Environment variable management

### AI Integration
- **HuggingFace Router API** - Multi-model inference with automatic fallback
- **Models**: Llama 3.1 8B, Qwen 2.5 7B, Phi 3.5 Mini, TinyLlama 1.1B

### Development Tools
- **Concurrently 9.0.1** - Run multiple processes
- **ESLint** - Code linting
- **Vite Proxy** - API proxying for development

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start both backend and frontend servers concurrently (recommended) |
| `npm run dev` | Start only the frontend development server (port 5173) |
| `npm run server` | Start only the backend server (port 3001) |
| `npm run build` | Build the production bundle |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check code quality |

## ⚙️ Configuration

### Backend Server (server.js)

- **Port**: 3001
- **Endpoints**:
  - `GET /` - Backend status page
  - `GET /api/health` - Health check
  - `POST /api/recipe` - Generate recipe from ingredients
- **Features**:
  - Model fallback system (tries 4 different AI models)
  - 45-second timeout per request
  - Comprehensive error logging

### Frontend (Vite)

- **Port**: 5173
- **Proxy**: All `/api/*` requests are proxied to `http://localhost:3001`
- **Hot Module Replacement (HMR)**: Enabled for fast development

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_HUGGINGFACE_API_KEY` | Your HuggingFace API access token | Yes |

## 🎨 UI Features

- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations** - Fade-in, slide-down, and chip appearance animations
- **Premium Color Scheme** - Warm orange/pink gradient with professional accents
- **Accessibility** - ARIA labels, semantic HTML, keyboard navigation support
- **Interactive Elements**:
  - Hover states on chips and buttons
  - Focus indicators for keyboard users
  - Loading states during recipe generation
  - Error messaging for failed requests

## 🤖 AI Recipe Generation

The app uses an intelligent prompt system that instructs the AI to:
- Create recipes using the provided ingredients
- Include metadata (servings, cooking time, difficulty)
- Format output in structured markdown
- Provide clear ingredient lists and step-by-step instructions

The recipe parser automatically:
- Extracts recipe title and description
- Parses cooking time (supports various formats: "30 minutes", "1 hour", etc.)
- Detects servings (handles ranges: "4-6 servings")
- Identifies difficulty level (Easy, Medium, Hard)
- Organizes ingredients and instructions into structured lists
- Cleans markdown formatting for display

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3001 (backend)
npx kill-port 3001

# Kill process on port 5173 (frontend)
npx kill-port 5173
```

### API Key Issues
- Ensure `.env` file exists in root directory
- Verify the key starts with `VITE_` prefix
- Restart the server after changing `.env` file
- Check HuggingFace account has valid API access

### Recipe Not Generating
- Check browser console for errors
- Verify backend is running at `http://localhost:3001`
- Test backend health: `http://localhost:3001/api/health`
- Check HuggingFace API status
- Review server logs for model failures

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

## 📝 Development Notes

### Adding New Features
1. Frontend components go in `src/components/`
2. Update styles in `src/index.css`
3. Backend endpoints in `server.js`
4. Restart server after backend changes

### AI Model Configuration
To modify AI behavior, edit the `SYSTEM_PROMPT` in `server.js`:
```javascript
const SYSTEM_PROMPT = `Your custom instructions here...`;
```

### Styling
The app uses CSS variables defined in `:root`:
```css
--primary: #FF6B35;      /* Orange */
--text: #2d2d2d;         /* Dark gray */
--bg: #fafaf8;           /* Light beige */
```

## 🚀 Production Deployment

### Build for Production
```bash
npm run build
```

The production files will be in the `dist/` directory.

### Deploy Backend
- Set `VITE_HUGGINGFACE_API_KEY` environment variable on your hosting platform
- Ensure Node.js 20+ is available
- Run `node server.js` to start the backend
- Configure your hosting to handle CORS if needed

### Deploy Frontend
- Upload `dist/` contents to your static hosting service
- Update API proxy configuration to point to your production backend URL
- Services: Vercel, Netlify, AWS S3 + CloudFront, etc.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 👨‍💻 Author

Created with ❤️ for making cooking easier and reducing food waste.

---

**Need help?** Check the troubleshooting section or open an issue on GitHub.
