import { useEffect, useState } from "react";
import { Bitcoin } from "lucide-react";
import { getCryptoPrices } from "../../services/cryptoService";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";

function CryptoCard() {
    const [cryptos, setCryptos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function loadPrices() {
        try {
            setLoading(true);
            setError("");

            const data = await getCryptoPrices();

            setCryptos(data);
        } catch {
            setError("Unable to load crypto prices");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const loadTimer = window.setTimeout(loadPrices, 0);
        return () => window.clearTimeout(loadTimer);
    }, []);

    return (
        <div className="card">
            <div className="crypto-header">
                <div className="card-title">
                    <div className="card-icon"><Bitcoin size={20} /></div>
                    <h2>Crypto Prices</h2>
                </div>

                <button onClick={loadPrices} disabled={loading}>
                    {loading ? "Refreshing..." : "Refresh"}
                </button>
            </div>

            {loading && <Loading message="Loading crypto prices..." />}
            {error && <ErrorMessage message={error} />}

            {!loading && cryptos.length === 0 && !error && (
                <p>No crypto data available.</p>
            )}

            <div className="crypto-list">
                {cryptos.map((crypto) => (
                    <div className="crypto-item" key={crypto.id}>
                        <div className="crypto-info">
                            <img
                                className="crypto-icon"
                                src={crypto.image}
                                alt={crypto.name}
                            />

                            <div>
                                <h3>{crypto.name}</h3>
                                <p>{crypto.symbol.toUpperCase()}</p>
                            </div>
                        </div>

                        <div className="crypto-price">
                            <strong>
                                ${crypto.current_price.toLocaleString()}
                            </strong>

                            <span className={crypto.price_change_percentage_24h >= 0 ? "price-positive" : "price-negative"}>
                                {crypto.price_change_percentage_24h?.toFixed(2)}%
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CryptoCard;
