export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

export interface GeocodingResponse {
  results?: GeocodingResult[];
}

export interface CurrentData {
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  surface_pressure: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  weather_code: number;
  time: string;
}

export interface DailyForecast {
  time: string[];
  weathercode: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
}

export interface WeatherResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  current: CurrentData;
  daily: DailyForecast;
}

export interface ChartDataPoint {
  date: string;
  dayName: string;
  maxTemp: number;
  minTemp: number;
  precipitation: number;
}
