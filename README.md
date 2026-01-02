# Chef AI

A React-based AI-powered recipe suggestion app that uses Hugging Face's AI models to generate recipes based on ingredients you have on hand.

## Features

- Input ingredients you have available
- Get AI-generated recipe suggestions using Hugging Face's Llama 3.2 model
- Clean, modern UI built with React and Vite

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Hugging Face API key:
   ```
   VITE_HUGGINGFACE_API_KEY=your_api_key_here
   ```
   You can get a free API key at [Hugging Face](https://huggingface.co/settings/tokens)

4. Run the development server:
   ```bash
   npm run dev
   ```

## Tech Stack

- React 18
- Vite
- Hugging Face Inference API
- React Markdown for recipe rendering

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
