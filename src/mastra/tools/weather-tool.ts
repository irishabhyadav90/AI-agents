import { createTool } from "@mastra/core";
import { z } from "zod";
import { getLocationCoordinates, getCurrentWeather, formatWeatherResponse } from "./weather-utils";

export const weatherTool = createTool({
  id: 'weather-tool',
  description: 'Get current weather information for a city using free weather API (no API key required)',
  inputSchema: z.object({
    location: z.string().min(2, "Location must be at least 2 characters").describe("City name (e.g., 'London', 'New York', 'Tokyo')"),
  }),
  outputSchema: z.object({
    location: z.string().describe("The location name"),
    temperature: z.number().describe("Current temperature in Celsius"),
    wind_speed: z.number().describe("Wind speed in km/h"),
    wind_direction: z.number().describe("Wind direction in degrees"),
    conditions: z.string().describe("Weather conditions description"),
    weather_code: z.number().describe("Weather code (WMO code)"),
    is_daytime: z.boolean().describe("Whether it's currently daytime"),
    success: z.boolean().describe("Whether the request was successful"),
    error: z.string().optional().describe("Error message if request failed"),
    raw_data: z.any().optional().describe("Raw weather data from API"),
  }),
  execute: async ({ context }) => {
    try {
      const { location } = context;

      console.log(`Fetching weather for ${location} using Open-Meteo API`);

      const { latitude, longitude, displayName } = await getLocationCoordinates(location);
      console.log(`Found coordinates for ${location}: ${latitude}, ${longitude}`);

      const weatherData = await getCurrentWeather(latitude, longitude);

      const formattedWeather = formatWeatherResponse(weatherData);

      return {
        location: displayName,
        ...formattedWeather,
        success: true,
        raw_data: weatherData,
      };

    } catch (error: any) {
      console.error("Weather API error:", error.message);

      const errorMessage = error.message || "Failed to fetch weather data";

      return {
        location: context.location,
        temperature: 0,
        wind_speed: 0,
        wind_direction: 0,
        conditions: errorMessage,
        weather_code: 0,
        is_daytime: false,
        success: false,
        error: errorMessage,
      };
    }
  },
});