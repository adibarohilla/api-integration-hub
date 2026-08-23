import { useEffect, useState } from "react";
import { Rocket, X, ExternalLink } from "lucide-react";
import { getNasaPicture } from "../../services/nasaService";

function NasaCard() {
    const [picture, setPicture] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    async function loadPicture() {
        try {
            setLoading(true);
            setError("");

            const data = await getNasaPicture();

            setPicture(data);
        } catch (err) {
            setError("Unable to load NASA picture");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        loadPicture();
    }, []);

    function closeModal() {
        setIsModalOpen(false);
    }

    return (
        <>
            <div className="card nasa-card">
                <div className="nasa-card-content">
                    <span className="nasa-badge">
                        <Rocket size={18} />
                        NASA
                    </span>

                    <h2>Astronomy Picture of the Day</h2>

                    <p>
                        Discover NASA's featured image or video
                        from the universe.
                    </p>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        disabled={!picture || loading}
                    >
                        {loading ? "Loading..." : "Explore"}
                    </button>

                    {error && <p>{error}</p>}
                </div>
            </div>

            {isModalOpen && picture && (
                <div
                    className="nasa-modal-overlay"
                    onClick={closeModal}
                >
                    <div
                        className="nasa-modal"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            className="nasa-modal-close"
                            onClick={closeModal}
                            aria-label="Close NASA picture"
                        >
                            <X size={20} />
                        </button>

                        <div className="nasa-modal-header">
                            <span className="nasa-badge">
                                <Rocket size={18} />
                                NASA APOD
                            </span>
                        </div>

                        <div className="nasa-modal-media">
                            {picture.media_type === "image" ? (
                                <img
                                    src={picture.url}
                                    alt={picture.title}
                                />
                            ) : (
                                <div className="nasa-video">
                                    <p>
                                        Today's NASA feature is a video.
                                    </p>

                                    <a
                                        href={picture.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >

                                        <ExternalLink size={16} />
                                        Watch NASA Video

                                    </a>
                                </div>
                            )}
                        </div>

                        <div className="nasa-modal-details">
                            <h2>{picture.title}</h2>

                            <p className="nasa-date">
                                {picture.date}
                            </p>

                            <p className="nasa-description">
                                {picture.explanation}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default NasaCard;