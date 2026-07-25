import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend } from 'recharts';
import { format, parseISO } from 'date-fns';
import { DailyForecast } from '../types';
import { convertTemp } from '../utils';

interface WeatherChartProps {
  forecast: DailyForecast;
  unit: 'C' | 'F';
}

export function WeatherChart({ forecast, unit }: WeatherChartProps) {
  const data = forecast.time.map((time, index) => ({
    date: format(parseISO(time), 'MMM d'),
    maxTemp: Math.round(convertTemp(forecast.temperature_2m_max[index], unit)),
    minTemp: Math.round(convertTemp(forecast.temperature_2m_min[index], unit)),
  }));

  const allTemps = data.flatMap(d => [d.maxTemp, d.minTemp]);
  const minDomain = Math.floor(Math.min(...allTemps) - 2);
  const maxDomain = Math.ceil(Math.max(...allTemps) + 2);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <h3 className="text-lg font-bold text-slate-800 mb-6">Temperature Trend</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
              dy={10}
            />
            <YAxis 
              domain={[minDomain, maxDomain]} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
              tickFormatter={(value) => `${value}°${unit}`}
            />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', padding: '12px' }}
              itemStyle={{ fontWeight: 600 }}
              labelStyle={{ color: '#64748b', marginBottom: '4px', fontWeight: 500 }}
            />
            <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '14px', fontWeight: 500, color: '#475569' }} />
            <ReferenceLine y={0} stroke="#cbd5e1" strokeDasharray="3 3" />
            <Line 
              type="monotone" 
              name="Max Temp"
              dataKey="maxTemp" 
              stroke="#ef4444" 
              strokeWidth={3} 
              dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} 
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Line 
              type="monotone" 
              name="Min Temp"
              dataKey="minTemp" 
              stroke="#3b82f6" 
              strokeWidth={3} 
              dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} 
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
