import ApiCard from "../ui/ApiCard";
import GithubCard from "../ui/GithubCard";
import WeatherCard from "../ui/WeatherCard";
import CountryCard from "../ui/CountryCard";
import CurrencyCard from "../ui/CurrencyCard";
import CryptoCard from "../ui/CryptoCard";

const apiCards = [

    "NASA",
];

function Dashboard() {
    return (
        <main className="container">
            <section className="dashboard">
                <GithubCard />
                <WeatherCard />
                <CountryCard />
                <CurrencyCard />
                <CryptoCard />

                {apiCards.map((card) => (
                    <ApiCard key={card} title={card} />
                ))}
            </section>
        </main>
    );
}

export default Dashboard;