import api from "./api";

export async function getCoordinates(city) {
    const response = await api.get(
        "https://geocoding-api.open-meteo.com/v1/search",
        {
            params: {
                name: city,
                count: 1,
                language: "en",
                format: "json",
            },
        }
    );

    if (!response.data.results?.length) {
        throw new Error("City not found");
    }

    return response.data.results[0];
}

export async function getWeather(latitude, longitude) {
    const response = await api.get(
        "https://api.open-meteo.com/v1/forecast",
        {
            params: {
                latitude,
                longitude,
                current: "temperature_2m,wind_speed_10m,weather_code",
            },
        }
    );

    return response.data;
}

export function getWeatherDescription(code) {
    const descriptions = {
        0: "Clear sky", 1: "Mostly clear", 2: "Partly cloudy", 3: "Overcast",
        45: "Foggy", 48: "Icy fog", 51: "Light drizzle", 53: "Drizzle",
        55: "Heavy drizzle", 61: "Light rain", 63: "Rain", 65: "Heavy rain",
        71: "Light snow", 73: "Snow", 75: "Heavy snow", 80: "Rain showers",
        81: "Heavy rain showers", 82: "Violent rain showers", 95: "Thunderstorm",
    };

    return descriptions[code] || "Unknown conditions";
}
