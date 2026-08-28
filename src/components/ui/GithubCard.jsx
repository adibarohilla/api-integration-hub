import { useState } from "react";
import { GitBranch, Search, ExternalLink } from "lucide-react";
import { getGithubUser } from "../../services/githubService";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";

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

        } catch {

            setUser(null);
            setError("User not found");

        } finally {

            setLoading(false);

        }
    }


    return (
        <div className="card">

            <div className="card-header">
                <div className="card-title">
                    <div className="card-icon">
                      <GitBranch size={20} />
                    </div>

                    <h2>GitHub</h2>
                </div>
            </div>

            <form onSubmit={(event) => { event.preventDefault(); handleSearch(); }}>
                <label className="sr-only" htmlFor="github-username">GitHub username</label>
                <input
                    id="github-username"
                    type="text"
                    placeholder="Search username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <button type="submit" disabled={loading}>
                    <Search size={16} />
                    Search
                </button>
            </form>

            {loading && <Loading message="Finding GitHub profile..." />}
            {error && <ErrorMessage message={error} />}


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
                        rel="noopener noreferrer"
                    >
                        View Profile
                        <ExternalLink size={15} />
                    </a>
                </div>

            )}

        </div>
    );
}

export default GithubCard;
