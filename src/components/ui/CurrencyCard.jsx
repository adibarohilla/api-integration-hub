import { useState } from "react";
import { convertCurrency } from "../../services/currencyService";

function CurrencyCard() {
    const [amount, setAmount] = useState("");
    const [from, setFrom] = useState("USD");
    const [to, setTo] = useState("PKR");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleConvert() {
        if (!amount || Number(amount) <= 0) {
            setError("Please enter a valid amount");
            setResult(null);
            return;
        }

        if (from === to) {
            setError("");
            setResult(Number(amount));
            return;
        }

        try {
            setLoading(true);
            setError("");
            setResult(null);

            const convertedAmount = await convertCurrency(
                Number(amount),
                from,
                to
            );

            setResult(convertedAmount);
        } catch (err) {
            setError("Unable to convert currency");
            setResult(null);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="card">
            <h2>Currency Converter</h2>

            <input
                type="number"
                min="0.01"
                step="0.01"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />

            <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
            >
                <option value="USD">USD</option>
                <option value="PKR">PKR</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
            </select>

            <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
            >
                <option value="PKR">PKR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
            </select>

            <button onClick={handleConvert}>
                Convert
            </button>

            {loading && <p>Converting...</p>}

            {error && <p>{error}</p>}

            {result !== null && (
                <div className="currency-result">
                    <h3>
                        {Number(amount).toLocaleString()} {from} ={" "}
                        {result.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}{" "}
                        {to}
                    </h3>
                </div>
            )}
        </div>
    );
}

export default CurrencyCard;