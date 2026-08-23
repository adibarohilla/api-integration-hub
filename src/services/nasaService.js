import api from "./api";

export async function getNasaPicture() {
    const response = await api.get(
        "https://api.nasa.gov/planetary/apod",
        {
            params: {
                api_key: import.meta.env.VITE_NASA_API_KEY,
            },
        }
    );

    return response.data;
}