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

## Deployment on Cloudflare Pages

This project is configured for deployment on Cloudflare Pages.

### Automatic Deployment (Recommended)

1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Go to **Workers & Pages** > **Create Application** > **Pages** > **Connect to Git**.
3. Select your repository.
4. Configure the build settings:
   - **Framework Preset**: Vite
   - **Build command**: `npm run build` (or `bun run build`)
   - **Build output directory**: `dist`
5. Click **Save and Deploy**.

### Routing

A `public/_redirects` file is included to handle client-side routing in Cloudflare Pages.

## Tech Stack

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
