import { useEffect, useRef, useState } from "react";
import { Rocket, X, ExternalLink } from "lucide-react";
import { getNasaPicture } from "../../services/nasaService";
import ErrorMessage from "./ErrorMessage";

function NasaCard() {
    const [picture, setPicture] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeButtonRef = useRef(null);

    async function loadPicture() {
        try {
            setLoading(true);
            setError("");

            const data = await getNasaPicture();

            setPicture(data);
        } catch {
            setError("Unable to load NASA picture");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        const loadTimer = window.setTimeout(loadPicture, 0);
        return () => window.clearTimeout(loadTimer);
    }, []);

    useEffect(() => {
        if (!isModalOpen) return undefined;

        closeButtonRef.current?.focus();
        function handleKeyDown(event) {
            if (event.key === "Escape") closeModal();
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isModalOpen]);

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

                    {error && <ErrorMessage message={error} />}
                </div>
            </div>

            {isModalOpen && picture && (
                <div
                    className="nasa-modal-overlay"
                    onClick={closeModal}
                    role="presentation"
                >
                    <div
                        className="nasa-modal"
                        onClick={(event) => event.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="nasa-picture-title"
                    >
                        <button
                            className="nasa-modal-close"
                            onClick={closeModal}
                            aria-label="Close NASA picture"
                            ref={closeButtonRef}
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
                            <h2 id="nasa-picture-title">{picture.title}</h2>

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
