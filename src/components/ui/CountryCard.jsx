import { useState } from "react";
import { searchCountry } from "../../services/countriesService";

function CountryCard() {
    const [country, setCountry] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSearch() {
        if (!country.trim()) {
            setError("Please enter a country");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setResult(null);

            const data = await searchCountry(country);

            const selectedCountry = data[0];

            setResult({
                name: selectedCountry.name,
                capital: selectedCountry.capital || "N/A",
                region: selectedCountry.region,
                population: selectedCountry.population,
                flag: selectedCountry.flags?.svg,
            });
        } catch (err) {
            setError("Country not found");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="card">
            <h2>Countries</h2>

            <input
                type="text"
                placeholder="Enter country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSearch();
                    }
                }}
            />

            <button onClick={handleSearch}>
                Search
            </button>

            {loading && <p>Loading country...</p>}

            {error && <p>{error}</p>}

            {result && (
                <div className="country-result">
                    <img
                        className="country-flag"
                        src={result.flag}
                        alt={`${result.name} flag`}
                    />

                    <h3>{result.name}</h3>

                    <p>Capital: {result.capital}</p>

                    <p>Region: {result.region}</p>

                    <p>
                        Population: {result.population.toLocaleString()}
                    </p>
                </div>
            )}
        </div>
    );
}

export default CountryCard;