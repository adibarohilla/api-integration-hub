import ApiCard from "../ui/ApiCard";
import GithubCard from "../ui/GithubCard";
import WeatherCard from "../ui/WeatherCard";

const apiCards = [

    "Countries",
    "Currency",
    "Crypto",
    "NASA",
];

function Dashboard() {
    return (
        <main className="container">
            <section className="dashboard">
                <GithubCard />
                <WeatherCard />

                {apiCards.map((card) => (
                    <ApiCard key={card} title={card} />
                ))}
            </section>
        </main>
    );
}

export default Dashboard;