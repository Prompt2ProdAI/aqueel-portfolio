# Portfolio Project

This is a personal portfolio website built with React, Vite, TypeScript, and Tailwind CSS.

## Getting Started

### Prerequisites

- Node.js & npm (or bun) installed.

### Installation

1. Clone the repository:
   ```sh
   git clone <YOUR_GIT_URL>
   cd self-portfolio
   ```

2. Install dependencies:
   ```sh
   npm install
   # or
   bun install
   ```

3. Start the development server:
   ```sh
   npm run dev
   # or
   bun dev
   ```

## Deployment on GitHub Pages

This project is configured for automatic deployment to GitHub Pages via GitHub Actions.

### Automatic Deployment

Every time you push to the `main` branch, a GitHub Action will automatically:
1. Build the project
2. Deploy the `dist` folder to GitHub Pages

The project is configured with a base path of `/self-portfolio/`, so it will be available at `https://<YOUR_USERNAME>.github.io/self-portfolio/`.

### Manual Configuration

1. Go to your repository on GitHub.
2. Navigate to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, ensure **GitHub Actions** is selected.

## Tech Stack

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
