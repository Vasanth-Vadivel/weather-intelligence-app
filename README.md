# Weather Intelligence Web App

A modern, fast, and static Single Page Application (SPA) designed to provide weather intelligence. This app is built with React, Vite, and Tailwind CSS. It connects to the open, keyless Open-Meteo APIs for accurate geocoding and weather forecasts without requiring any API keys.

## Features

- **City Search:** Easily find weather conditions for any city worldwide.
- **Current Conditions:** Displays temperature, wind speed, and current weather status.
- **7-Day Forecast:** Detailed daily forecasts including maximum and minimum temperatures, and precipitation.
- **Weather Chart:** Visual trend of temperatures over the upcoming week using Recharts.
- **Smart Recommendations:** Real-time advice on what to expect based on upcoming weather data.

## Project Structure

- `src/App.tsx`: Main application file managing state and API integrations.
- `src/utils.ts`: Helper functions for weather codes and recommendations.
- `src/types.ts`: TypeScript definitions for the Open-Meteo responses.
- `src/components/`: Reusable React components for the UI.

## Getting Started

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production (Cloudflare Pages)

1. Run the build script to generate the static files:
   ```bash
   npm run build
   ```
2. The static site will be output in the `dist` directory. This folder can be directly uploaded to static hosting services like Cloudflare Pages, Vercel, or Netlify.
