/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SearchHeader } from './components/SearchHeader';
import { CurrentWeatherCard } from './components/CurrentWeatherCard';
import { ForecastGrid } from './components/ForecastGrid';
import { WeatherChart } from './components/WeatherChart';
import { Recommendations } from './components/Recommendations';
import { ErrorBanner } from './components/ErrorBanner';
import { SkeletonLoader } from './components/SkeletonLoader';
import { WeatherResponse, GeocodingResponse, GeocodingResult } from './types';
import { CloudRain } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [location, setLocation] = useState<GeocodingResult | null>(null);
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchWeatherForLocation = async (loc: GeocodingResult, silent = false) => {
    if (silent) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${loc.latitude}&longitude=${loc.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,wind_speed_10m,wind_direction_10m,weather_code&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`);
      if (!weatherRes.ok) throw new Error('Failed to fetch weather data.');
      
      const weatherData: WeatherResponse = await weatherRes.json();
      setWeatherData(weatherData);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      if (!silent) {
        setWeatherData(null);
        setLocation(null);
      }
    } finally {
      if (silent) {
        setIsRefreshing(false);
      } else {
        setIsLoading(false);
      }
    }
  };

  const handleSearch = async (cityOrLocation: string | GeocodingResult) => {
    setIsLoading(true);
    setError(null);
    
    try {
      let loc: GeocodingResult;

      if (typeof cityOrLocation === 'string') {
        const trimmedCity = cityOrLocation.trim();
        if (trimmedCity.length < 2) {
          setError('Please enter a city name with at least 2 characters.');
          setWeatherData(null);
          setLocation(null);
          setIsLoading(false);
          return;
        }

        // 1. Geocode
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(trimmedCity)}&count=1&language=en&format=json`);
        if (!geoRes.ok) throw new Error('Failed to fetch location data.');
        
        const geoData: GeocodingResponse = await geoRes.json();
        if (!geoData.results || geoData.results.length === 0) {
          throw new Error('City not found. Please check the spelling and try again.');
        }

        loc = geoData.results[0];
      } else {
        loc = cityOrLocation;
      }

      setLocation(loc);
      await fetchWeatherForLocation(loc);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      setWeatherData(null);
      setLocation(null);
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    if (location) {
      fetchWeatherForLocation(location, true);
    }
  };

  React.useEffect(() => {
    if (!location) return;

    const intervalId = setInterval(() => {
      if (!document.hidden) {
        handleRefresh();
      }
    }, 10 * 60 * 1000); // 10 minutes

    return () => clearInterval(intervalId);
  }, [location]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <SearchHeader onSearch={handleSearch} isLoading={isLoading} unit={unit} onUnitChange={setUnit} />
        
        <ErrorBanner message={error || ''} onClose={() => setError(null)} />

        {isLoading ? (
          <SkeletonLoader />
        ) : weatherData && location && lastUpdated && !error ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CurrentWeatherCard weather={weatherData.current} location={location} unit={unit} lastUpdated={lastUpdated} onRefresh={handleRefresh} isRefreshing={isRefreshing} />
            <Recommendations forecast={weatherData.daily} />

            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-4">7-Day Forecast</h2>
              <ForecastGrid forecast={weatherData.daily} unit={unit} />
            </div>

            <div className="mt-8">
              <WeatherChart forecast={weatherData.daily} unit={unit} />
            </div>
          </div>
        ) : !error ? (
          <div className="flex flex-col items-center justify-center py-24 text-center px-4 animate-in fade-in duration-500">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-300 mb-6 shadow-inner">
              <CloudRain className="w-10 h-10 animate-float" />
            </div>
            <h2 className="text-2xl font-bold text-slate-700 mb-3">Welcome to Weather Intelligence</h2>
            <p className="text-slate-500 max-w-md text-lg leading-relaxed">
              Search for any city worldwide to get real-time current conditions, a 7-day forecast, interactive charts, and smart planning recommendations.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
