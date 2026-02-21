# PromptPro

A powerful prompt engineering tool powered by Gemini.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Add your Gemini API Key to `.env`:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

## Deployment

This project is a standard Vite React application and can be deployed to any static hosting provider.

### Vercel (Recommended)

1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. Add the `GEMINI_API_KEY` environment variable in the Vercel dashboard.
4. Deploy!

### Netlify

1. Push your code to a GitHub repository.
2. Import the project into Netlify.
3. Add the `GEMINI_API_KEY` environment variable in the Netlify dashboard.
4. Deploy!

## Features

- **Prompt Generation**: Generate optimized prompts for various AI models.
- **Undo/Redo**: Easily revert changes to your prompts.
- **History**: Access previous generations.
- **Pricing & Tokens**: Simulated token system (client-side only).
- **Feedback**: Submit feedback directly from the app.

## License

MIT
