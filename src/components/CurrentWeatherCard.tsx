import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { WeatherIcon } from './WeatherIcon';
import { getWeatherDescription, convertTemp } from '../utils';
import { CurrentData, GeocodingResult } from '../types';
import { MapPin, Wind, Clock, Thermometer, Droplets, Gauge, RefreshCw } from 'lucide-react';

interface CurrentWeatherCardProps {
  weather: CurrentData;
  location: GeocodingResult;
  unit: 'C' | 'F';
  lastUpdated: Date;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export function CurrentWeatherCard({ weather, location, unit, lastUpdated, onRefresh, isRefreshing }: CurrentWeatherCardProps) {
  const description = getWeatherDescription(weather.weather_code);
  const temp = Math.round(convertTemp(weather.temperature_2m, unit));
  const feelsLike = Math.round(convertTemp(weather.apparent_temperature, unit));
  const [relativeTime, setRelativeTime] = useState('just now');

  useEffect(() => {
    const updateTime = () => {
      if (!lastUpdated) return;
      const distance = formatDistanceToNow(lastUpdated, { addSuffix: true });
      setRelativeTime(distance === 'less than a minute ago' ? 'just now' : distance);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [lastUpdated]);
  
  let gradient = 'from-slate-50 to-white';
  if (weather.weather_code <= 2) gradient = 'from-amber-50/60 to-orange-50/60';
  else if (weather.weather_code >= 51 && weather.weather_code <= 67) gradient = 'from-blue-50/80 to-slate-50';
  else if (weather.weather_code >= 71 && weather.weather_code <= 86) gradient = 'from-indigo-50/60 to-blue-50/40';
  else if (weather.weather_code >= 95) gradient = 'from-purple-50/60 to-slate-50';
  else if (weather.weather_code >= 3 && weather.weather_code <= 48) gradient = 'from-slate-100 to-slate-50';
  
  return (
    <div className={`rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 transition-all hover:shadow-md bg-gradient-to-br ${gradient}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-2 text-slate-500">
          <MapPin className="w-5 h-5 text-blue-500" />
          <span className="font-semibold text-lg text-slate-700">
            {location.name}{location.admin1 ? `, ${location.admin1}` : ''}, {location.country}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-400 bg-white/60 px-3 py-1.5 rounded-full shadow-sm backdrop-blur-sm">
            <Clock className="w-4 h-4" />
            <span>Updated {relativeTime}</span>
          </div>
          <button 
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 text-sm font-medium text-blue-600 bg-blue-50/80 hover:bg-blue-100 px-3 py-1.5 rounded-full shadow-sm backdrop-blur-sm transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isRefreshing ? 'Refreshing...' : 'Refresh Weather Data'}</span>
          </button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
        <div className="flex items-center gap-6">
          <div className="p-4 bg-white/60 shadow-sm backdrop-blur-sm rounded-full">
            <WeatherIcon code={weather.weather_code} className="w-20 h-20 text-blue-500 drop-shadow-sm" animate={true} />
          </div>
          <div className="flex flex-col">
            <div className="flex items-start">
              <span className="text-7xl font-bold tracking-tighter text-slate-800">{temp}</span>
              <span className="text-3xl font-bold text-slate-400 mt-2">°{unit}</span>
            </div>
            <span className="text-xl font-medium text-slate-600 mt-1 capitalize">{description.text}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
            <Thermometer className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-500">Feels Like</span>
            <span className="font-bold text-slate-700">{feelsLike}°{unit}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <Wind className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-500">Wind</span>
            <span className="font-bold text-slate-700">{weather.wind_speed_10m} km/h</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50">
          <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 shrink-0">
            <Droplets className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-500">Humidity</span>
            <span className="font-bold text-slate-700">{weather.relative_humidity_2m}%</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
            <Gauge className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-500">Pressure</span>
            <span className="font-bold text-slate-700">{weather.surface_pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
}
