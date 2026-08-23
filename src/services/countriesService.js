import api from "./api";

export async function searchCountry(name) {
    const response = await api.get(
        `https://countries.dev/name/${encodeURIComponent(name)}`
    );

    return response.data;
}