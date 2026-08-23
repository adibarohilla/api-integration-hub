import { useEffect, useState } from "react";
import { getCryptoPrices } from "../../services/cryptoService";

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
        } catch (err) {
            setError("Unable to load crypto prices");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadPrices();
    }, []);

    return (
        <div className="card">
            <div className="crypto-header">
                <h2>Crypto Prices</h2>

                <button onClick={loadPrices} disabled={loading}>
                    {loading ? "Refreshing..." : "Refresh"}
                </button>
            </div>

            {error && <p>{error}</p>}

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

                            <span>
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