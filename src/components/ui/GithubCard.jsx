import { useState } from "react";
import { getGithubUser } from "../../services/githubService";

function GithubCard() {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSearch() {

        if (!username) {
            setError("Please enter a username");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const data = await getGithubUser(username);

            setUser(data);

        } catch (err) {

            setUser(null);
            setError("User not found");

        } finally {

            setLoading(false);

        }
    }


    return (
        <div className="card">

            <h2>GitHub</h2>


            <input
                type="text"
                placeholder="Search username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSearch();
                    }
                }}
            />

            <button onClick={handleSearch}>
                Search
            </button>


            {loading && <p>Loading...</p>}


            {error && <p>{error}</p>}


            {user && (

                <div>

                    <img
                        className="avatar"
                        src={user.avatar_url}
                        alt={user.login}
                    />


                    <h3>{user.login}</h3>


                    <p>
                        {user.bio || "No bio available"}
                    </p>


                    <p>
                        Followers: {user.followers}
                    </p>


                    <p>
                        Repositories: {user.public_repos}
                    </p>


                    <a
                        href={user.html_url}
                        target="_blank"
                    >
                        View Profile
                    </a>

                </div>

            )}

        </div>
    );
}

export default GithubCard;