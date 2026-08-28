import { useState } from "react";
import {
    Cloud,
    CloudFog,
    CloudLightning,
    CloudRain,
    CloudSnow,
    CloudSun,
    Search,
    Sun,
} from "lucide-react";
import {
    getCoordinates,
    getWeather,
    getWeatherDescription,
} from "../../services/weatherService";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";

function WeatherCard() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function getWeatherIcon(code) {
        if (code === 0) return Sun;
        if ([1, 2, 3].includes(code)) return CloudSun;
        if ([45, 48].includes(code)) return CloudFog;
        if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return CloudRain;
        if ([71, 73, 75].includes(code)) return CloudSnow;
        if (code === 95) return CloudLightning;
        return Cloud;
    }

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
                weatherCode: data.current.weather_code,
                condition: getWeatherDescription(data.current.weather_code),
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

            <div className="card-header">
                <div className="card-title">
                    <div className="card-icon">
                        <CloudSun size={20} />
                    </div>

                    <h2>Weather</h2>
                </div>
            </div>
            <form onSubmit={(event) => { event.preventDefault(); handleSearch(); }}>
                <label className="sr-only" htmlFor="weather-city">City</label>
                <input
                    id="weather-city"
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />

                <button type="submit" disabled={loading}>
                    <Search size={16} />
                    Search
                </button>
            </form>

            {loading && <Loading message="Loading weather..." />}
            {error && <ErrorMessage message={error} />}

            {weather && (
                <div className="weather-result">
                    {(() => {
                        const WeatherIcon = getWeatherIcon(weather.weatherCode);
                        return (
                            <div className="weather-summary">
                                <WeatherIcon size={38} aria-hidden="true" />
                                <h3>{weather.city}, {weather.country}</h3>
                            </div>
                        );
                    })()}

                    <p>
                        Temperature: {weather.temperature}°C
                    </p>

                    <p>Conditions: {weather.condition}</p>

                    <p>
                        Wind: {weather.windSpeed} km/h
                    </p>
                </div>
            )}
        </div>
    );
}

export default WeatherCard;
