# 🌤️ Weather Intelligence App

A modern, responsive Single Page Application (SPA) providing real-time weather analytics, 7-day forecasting, dynamic temperature trend visualizers, and smart planning recommendations. Built with React, Vite, Tailwind CSS, and Lucide React icons.

---

## 🌟 Key Features

- **Dynamic City Search & Autocomplete**: Real-time city suggestions using Open-Meteo Geocoding API.
- **Current Weather Dashboard**: Displays temperature (°C/°F), wind speed, relative humidity, pressure, and feels-like metrics.
- **7-Day Forecast Grid**: Weather code icons, daily max/min temperatures, and precipitation totals (mm).
- **Interactive Temperature Trend Chart**: Visual dual-line trend tracking daily high and low temperatures with hover tooltips.
- **Smart Planning Recommendations**: Dynamic practical tips for outfits, outdoor activities, and travel weather alerts based on forecasts.
- **Robust Error Handling**: Clean error banners for invalid city queries or API downtime without breaking UI.

---

## 🔌 API Integrations (Public & Keyless)

This application uses public Open-Meteo APIs (no API keys required):

- **Geocoding API**: `https://geocoding-api.open-meteo.com/v1/search?name={city}&count=5&language=en&format=json`
- **Forecast API**: `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`

---

## 🚀 Local Development Setup

To run this project locally:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Vasanth-Vadivel/weather-intelligence-app.git](https://github.com/Vasanth-Vadivel/weather-intelligence-app.git)
   cd weather-intelligence-app
