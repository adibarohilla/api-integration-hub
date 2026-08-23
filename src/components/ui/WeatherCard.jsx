import { useState } from "react";
import {
    getCoordinates,
    getWeather,
} from "../../services/weatherService";

function WeatherCard() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSearch() {
        if (!city.trim()) {
            setError("Please enter a city");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setWeather(null);

            const location = await getCoordinates(city);

            const data = await getWeather(
                location.latitude,
                location.longitude
            );

            setWeather({
                city: location.name,
                country: location.country,
                temperature: data.current.temperature_2m,
                windSpeed: data.current.wind_speed_10m,
            });
        } catch (err) {
            setError(
                err.message || "Unable to find weather for this city"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="card">
            <h2>Weather</h2>

            <input
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSearch();
                    }
                }}
            />

            <button onClick={handleSearch}>
                Search
            </button>

            {loading && <p>Loading weather...</p>}

            {error && <p>{error}</p>}

            {weather && (
                <div className="weather-result">
                    <h3>
                        {weather.city}, {weather.country}
                    </h3>

                    <p>
                        Temperature: {weather.temperature}°C
                    </p>

                    <p>
                        Wind: {weather.windSpeed} km/h
                    </p>
                </div>
            )}
        </div>
    );
}

export default WeatherCard;