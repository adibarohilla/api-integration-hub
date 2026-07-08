import ApiCard from "../ui/ApiCard";
import GithubCard from "../ui/GithubCard";

const apiCards = [

    "Weather",
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

                {apiCards.map((card) => (
                    <ApiCard key={card} title={card} />
                ))}
            </section>
        </main>
    );
}

export default Dashboard;