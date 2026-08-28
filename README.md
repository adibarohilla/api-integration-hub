# API Integration Hub

A responsive React dashboard that brings several public APIs into one practical interface. Search GitHub profiles, check weather and country facts, convert currencies, view crypto prices, and explore NASA's Astronomy Picture of the Day.

## Features

- GitHub profile lookup
- City weather with current conditions and wind speed
- Country search with flag, capital, region, and population
- Currency converter (USD, PKR, EUR, GBP, and JPY)
- Live Bitcoin, Ethereum, and Solana prices
- NASA Astronomy Picture of the Day in an accessible modal
- Loading, error, keyboard, and focus states for every API interaction

## APIs

| Feature | API |
| --- | --- |
| GitHub profiles | GitHub REST API |
| Weather | Open-Meteo Geocoding and Forecast APIs |
| Countries | Countries.dev |
| Currency | ExchangeRate-API |
| Crypto | CoinGecko API |
| Astronomy | NASA APOD API |

## Getting started

```bash
git clone https://github.com/YOUR_USERNAME/api-integration-hub.git
cd api-integration-hub
npm install
```

Create a `.env` file from the example, then add a NASA API key. `DEMO_KEY` is suitable for local testing but has limited request capacity.

```bash
copy .env.example .env
npm run dev
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run lint` | Run ESLint |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |

## Tech stack

React, Vite, Axios, Lucide React, CSS, and public REST APIs.

## Project ideas

- Add unit tests for API services and UI states
- Let users choose more currencies and cryptocurrencies
- Persist recent searches in local storage
- Deploy the dashboard to Vercel or Netlify

## License

This project is for personal portfolio and learning purposes.
