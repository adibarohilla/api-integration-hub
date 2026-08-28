import { useState } from "react";
import { Globe2, Search } from "lucide-react";
import { searchCountry } from "../../services/countriesService";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";

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
                name: selectedCountry.name?.common || selectedCountry.name,
                capital: Array.isArray(selectedCountry.capital)
                    ? selectedCountry.capital[0]
                    : selectedCountry.capital || "N/A",
                region: selectedCountry.region,
                population: selectedCountry.population,
                flag: selectedCountry.flags?.svg,
            });
        } catch {
            setError("Country not found");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="card">
            <div className="card-header">
                <div className="card-title">
                    <div className="card-icon"><Globe2 size={20} /></div>
                    <h2>Countries</h2>
                </div>
            </div>

            <form onSubmit={(event) => { event.preventDefault(); handleSearch(); }}>
                <label className="sr-only" htmlFor="country-name">Country name</label>
                <input
                    id="country-name"
                    type="text"
                    placeholder="Enter country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />

                <button type="submit" disabled={loading}><Search size={16} /> Search</button>
            </form>

            {loading && <Loading message="Loading country..." />}

            {error && <ErrorMessage message={error} />}

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
