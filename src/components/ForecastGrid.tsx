import React from 'react';
import { format, parseISO } from 'date-fns';
import { DailyForecast } from '../types';
import { WeatherIcon } from './WeatherIcon';
import { getWeatherDescription, convertTemp } from '../utils';
import { Droplets } from 'lucide-react';

interface ForecastGridProps {
  forecast: DailyForecast;
  unit: 'C' | 'F';
}

export function ForecastGrid({ forecast, unit }: ForecastGridProps) {
  const days = forecast.time.map((time, index) => ({
    date: time,
    maxTemp: Math.round(convertTemp(forecast.temperature_2m_max[index], unit)),
    minTemp: Math.round(convertTemp(forecast.temperature_2m_min[index], unit)),
    weatherCode: forecast.weathercode[index],
    precip: forecast.precipitation_sum[index]
  }));

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {days.map((day, i) => {
        const dateObj = parseISO(day.date);
        const dayName = i === 0 ? 'Today' : format(dateObj, 'EEE');
        
        return (
          <div key={day.date} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col items-center transition-all hover:shadow-md hover:-translate-y-1">
            <span className="font-medium text-slate-500 mb-1">{dayName}</span>
            <span className="text-xs text-slate-400 mb-3">{format(dateObj, 'MMM d')}</span>
            
            <WeatherIcon code={day.weatherCode} className="w-10 h-10 text-slate-700 mb-3" />
            
            <div className="flex items-baseline gap-2 mb-3">
              <span className="font-bold text-slate-800">{day.maxTemp}°</span>
              <span className="font-medium text-slate-400 text-sm">{day.minTemp}°</span>
            </div>

            <div className="flex items-center gap-1 text-xs font-medium text-blue-500 bg-blue-50 px-2 py-1 rounded-full w-full justify-center">
              <Droplets className="w-3 h-3" />
              <span>{day.precip}mm</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
