import api from "./api";

export async function convertCurrency(amount, from, to) {
    const response = await api.get(
        `https://open.er-api.com/v6/latest/${from}`
    );

    const rate = response.data.rates[to];

    if (!rate) {
        throw new Error("Currency not supported");
    }

    return amount * rate;
}