import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { convertCurrency } from "../../services/currencyService";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";

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
        } catch {
            setError("Unable to convert currency");
            setResult(null);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="card">
            <div className="card-header">
                <div className="card-title">
                    <div className="card-icon"><ArrowLeftRight size={20} /></div>
                    <h2>Currency Converter</h2>
                </div>
            </div>

            <form onSubmit={(event) => { event.preventDefault(); handleConvert(); }}>
                <label className="sr-only" htmlFor="currency-amount">Amount</label>
                <input
                    id="currency-amount"
                    type="number"
                    min="0.01"
                    step="0.01"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

            <label className="sr-only" htmlFor="currency-from">Convert from</label>
            <select id="currency-from" value={from} onChange={(e) => setFrom(e.target.value)}>
                <option value="USD">USD</option>
                <option value="PKR">PKR</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
            </select>

            <label className="sr-only" htmlFor="currency-to">Convert to</label>
            <select id="currency-to" value={to} onChange={(e) => setTo(e.target.value)}>
                <option value="PKR">PKR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
            </select>

            <button type="submit" disabled={loading}>Convert</button>
            </form>

            {loading && <Loading message="Converting..." />}

            {error && <ErrorMessage message={error} />}

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
