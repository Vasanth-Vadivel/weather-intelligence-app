import React from 'react';
import { generateRecommendations } from '../utils';
import { DailyForecast } from '../types';
import { Shirt, Compass, Umbrella } from 'lucide-react';

interface RecommendationsProps {
  forecast: DailyForecast;
}

export function Recommendations({ forecast }: RecommendationsProps) {
  const dailyData = forecast.time.map((_, index) => ({
    maxTemp: forecast.temperature_2m_max[index],
    minTemp: forecast.temperature_2m_min[index],
    precip: forecast.precipitation_sum[index],
    weatherCode: forecast.weathercode[index]
  }));

  const { outfit, activity, alert } = generateRecommendations(dailyData);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-blue-50/80 rounded-3xl p-6 border border-blue-100 flex flex-col transition-all hover:shadow-md hover:bg-blue-50">
        <div className="flex items-center gap-3 text-blue-700 mb-4">
          <div className="p-2 bg-blue-100 rounded-xl">
            <Shirt className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base">Outfit</h3>
        </div>
        <p className="text-blue-900/80 font-medium leading-relaxed flex-1">{outfit}</p>
      </div>

      <div className="bg-emerald-50/80 rounded-3xl p-6 border border-emerald-100 flex flex-col transition-all hover:shadow-md hover:bg-emerald-50">
        <div className="flex items-center gap-3 text-emerald-700 mb-4">
          <div className="p-2 bg-emerald-100 rounded-xl">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base">Activity</h3>
        </div>
        <p className="text-emerald-900/80 font-medium leading-relaxed flex-1">{activity}</p>
      </div>

      <div className="bg-amber-50/80 rounded-3xl p-6 border border-amber-100 flex flex-col transition-all hover:shadow-md hover:bg-amber-50">
        <div className="flex items-center gap-3 text-amber-700 mb-4">
          <div className="p-2 bg-amber-100 rounded-xl">
            <Umbrella className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base">Travel Tip</h3>
        </div>
        <p className="text-amber-900/80 font-medium leading-relaxed flex-1">{alert}</p>
      </div>
    </div>
  );
}
