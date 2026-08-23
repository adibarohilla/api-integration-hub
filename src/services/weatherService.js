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