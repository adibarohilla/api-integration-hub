import api from "./api";

export async function getCryptoPrices() {
    const response = await api.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
            params: {
                vs_currency: "usd",
                ids: "bitcoin,ethereum,solana",
                order: "market_cap_desc",
                per_page: 3,
                page: 1,
                sparkline: false,
            },
        }
    );

    return response.data;
}