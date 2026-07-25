import React from 'react';
import { Cloud, CloudDrizzle, CloudFog, CloudHail, CloudLightning, CloudRain, CloudSnow, CloudSun, Sun } from 'lucide-react';
import { getWeatherDescription } from '../utils';

interface WeatherIconProps {
  code: number;
  className?: string;
  animate?: boolean;
}

export function WeatherIcon({ code, className = 'w-6 h-6', animate = false }: WeatherIconProps) {
  const { icon } = getWeatherDescription(code);
  const combinedClassName = `${className} ${animate ? 'animate-float' : ''}`;

  switch (icon) {
    case 'sun': return <Sun className={combinedClassName} />;
    case 'sun-cloud': return <CloudSun className={combinedClassName} />;
    case 'cloud-sun': return <CloudSun className={combinedClassName} />;
    case 'cloud': return <Cloud className={combinedClassName} />;
    case 'cloud-fog': return <CloudFog className={combinedClassName} />;
    case 'cloud-drizzle': return <CloudDrizzle className={combinedClassName} />;
    case 'cloud-rain': return <CloudRain className={combinedClassName} />;
    case 'cloud-hail': return <CloudHail className={combinedClassName} />;
    case 'cloud-snow': return <CloudSnow className={combinedClassName} />;
    case 'cloud-lightning': return <CloudLightning className={combinedClassName} />;
    default: return <Cloud className={combinedClassName} />;
  }
}
