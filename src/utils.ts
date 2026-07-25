import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertTemp(tempC: number, unit: 'C' | 'F'): number {
  if (unit === 'F') return (tempC * 9 / 5) + 32;
  return tempC;
}

export function getWeatherDescription(code: number): { text: string; icon: string } {
  const codeMap: Record<number, { text: string; icon: string }> = {
    0: { text: 'Clear sky', icon: 'sun' },
    1: { text: 'Mainly clear', icon: 'sun-cloud' },
    2: { text: 'Partly cloudy', icon: 'cloud-sun' },
    3: { text: 'Overcast', icon: 'cloud' },
    45: { text: 'Fog', icon: 'cloud-fog' },
    48: { text: 'Depositing rime fog', icon: 'cloud-fog' },
    51: { text: 'Light drizzle', icon: 'cloud-drizzle' },
    53: { text: 'Moderate drizzle', icon: 'cloud-drizzle' },
    55: { text: 'Dense drizzle', icon: 'cloud-drizzle' },
    56: { text: 'Light freezing drizzle', icon: 'cloud-drizzle' },
    57: { text: 'Dense freezing drizzle', icon: 'cloud-drizzle' },
    61: { text: 'Slight rain', icon: 'cloud-rain' },
    63: { text: 'Moderate rain', icon: 'cloud-rain' },
    65: { text: 'Heavy rain', icon: 'cloud-rain' },
    66: { text: 'Light freezing rain', icon: 'cloud-hail' },
    67: { text: 'Heavy freezing rain', icon: 'cloud-hail' },
    71: { text: 'Slight snow fall', icon: 'cloud-snow' },
    73: { text: 'Moderate snow fall', icon: 'cloud-snow' },
    75: { text: 'Heavy snow fall', icon: 'cloud-snow' },
    77: { text: 'Snow grains', icon: 'cloud-snow' },
    80: { text: 'Slight rain showers', icon: 'cloud-rain' },
    81: { text: 'Moderate rain showers', icon: 'cloud-rain' },
    82: { text: 'Violent rain showers', icon: 'cloud-lightning' },
    85: { text: 'Slight snow showers', icon: 'cloud-snow' },
    86: { text: 'Heavy snow showers', icon: 'cloud-snow' },
    95: { text: 'Thunderstorm', icon: 'cloud-lightning' },
    96: { text: 'Thunderstorm with slight hail', icon: 'cloud-lightning' },
    99: { text: 'Thunderstorm with heavy hail', icon: 'cloud-lightning' },
  };

  return codeMap[code] || { text: 'Unknown', icon: 'cloud' };
}

export function generateRecommendations(dailyData: { maxTemp: number; minTemp: number; precip: number; weatherCode: number }[]) {
  const next3Days = dailyData.slice(0, 3);
  
  const highTemp = Math.max(...next3Days.map(d => d.maxTemp));
  const lowTemp = Math.min(...next3Days.map(d => d.minTemp));
  const anyRain = next3Days.some(d => d.precip > 1);
  const anySnow = next3Days.some(d => [71, 73, 75, 77, 85, 86].includes(d.weatherCode));
  
  let outfit = "Comfortable everyday clothing.";
  if (highTemp > 30) {
    outfit = "Light, breathable clothing recommended. Stay cool!";
  } else if (highTemp > 20) {
    if (lowTemp < 15) {
      outfit = "Light clothing for the day, but carry a light jacket for cool evenings.";
    } else {
      outfit = "Light cotton clothing recommended.";
    }
  } else if (highTemp > 10) {
    outfit = "A light jacket or sweater is recommended.";
  } else {
    outfit = "Heavy layers and a warm coat are needed.";
  }

  let activity = "Great conditions for outdoor activities!";
  if (anyRain && anySnow) {
    activity = "Indoor activities recommended due to mixed precipitation.";
  } else if (anySnow) {
    activity = "Great for winter sports, otherwise stick to indoor activities.";
  } else if (anyRain) {
    activity = "Good for indoor activities due to expected rain.";
  } else if (highTemp > 35) {
    activity = "Avoid strenuous outdoor activities during peak heat.";
  } else if (highTemp < 0) {
    activity = "Limit outdoor exposure due to freezing temperatures.";
  }

  let alert = "No major weather alerts. Enjoy your day!";
  if (anyRain) {
    alert = "Rain expected in the coming days; carry an umbrella.";
  } else if (anySnow) {
    alert = "Snow expected. Drive safely and plan for possible delays.";
  } else if (highTemp > 32) {
    alert = "High heat alert. Stay hydrated and use sunscreen.";
  }

  return { outfit, activity, alert };
}
