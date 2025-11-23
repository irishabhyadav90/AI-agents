import axios from "axios";

export const getWeatherDescription = (code: number): string => {
  const weatherCodes: { [key: number]: string } = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail'
  };
  return weatherCodes[code] || 'Unknown weather';
};

export const getLocationCoordinates = async (location: string) => {
  const geocodingUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&limit=1`;

  const response = await axios.get(geocodingUrl, {
    timeout: 10000,
    headers: {
      'User-Agent': 'weather-agent/1.0'
    }
  });

  if (!response.data || response.data.length === 0) {
    throw new Error(`Location "${location}" not found. Please check the spelling or try a different city.`);
  }

  const { lat, lon, display_name } = response.data[0];
  return {
    latitude: parseFloat(lat),
    longitude: parseFloat(lon),
    displayName: display_name || location
  };
};


export const getCurrentWeather = async (latitude: number, longitude: number) => {
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

  const response = await axios.get(weatherUrl, {
    timeout: 10000
  });

  return response.data;
};

export const formatWeatherResponse = (weatherData: any) => {
  const current = weatherData.current_weather;

  return {
    temperature: Math.round(current.temperature * 10) / 10,
    wind_speed: Math.round(current.windspeed * 10) / 10,
    wind_direction: current.winddirection,
    conditions: getWeatherDescription(current.weathercode),
    weather_code: current.weathercode,
    is_daytime: current.is_day === 1,
  };
};