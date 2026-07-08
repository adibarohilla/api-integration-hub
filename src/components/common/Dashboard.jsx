import ApiCard from "../ui/ApiCard";

const apiCards = [
  "GitHub",
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
        {apiCards.map((card) => (
          <ApiCard key={card} title={card} />
        ))}
      </section>
    </main>
  );
}

export default Dashboard;