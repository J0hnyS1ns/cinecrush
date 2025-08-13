import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Favorites = () => {
    const [likedMovies, setLikedMovies] = useState([]);
    const [hoveredMovieId, setHoveredMovieId] = useState(null);
    const history = useHistory();

    useEffect(() => {
        const storedLikes = JSON.parse(localStorage.getItem("likedMovies")) || [];
        setLikedMovies(storedLikes);
    }, []);

    const removeFromFavorites = (id) => {
        const updated = likedMovies.filter((movie) => movie.id !== id);
        setLikedMovies(updated);
        localStorage.setItem("likedMovies", JSON.stringify(updated));
    };

    const handleClick = (id) => {
        history.push(`/movie/${id}`);
    };

    return (
        <div className="container hautpage">
            <div className="mb-4 mt-5 text-center fs-3">
                <span className="text-white">MY FAVORITES </span>
                <span className="corailf">MOVIES</span>
            </div>
            {likedMovies.length === 0 ? (
                <p className="text-white">No movies added to favorites.</p>
            ) : (
                <div className="d-flex flex-wrap gap-4 flexFavoris">
                    {likedMovies.map((movie) => (
                        <div key={movie.id} style={{ width: "180px", position: "relative" }}>
                            <img
                                src={movie.poster_path
                                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                    : require("../assets/Placeholder/Placeholder.jpg")
                                }
                                alt={movie.title}
                                style={{ width: "100%", cursor: "pointer" }}
                                onClick={() => handleClick(movie.id)}
                            />
                            <button
                                onClick={() => removeFromFavorites(movie.id)}
                                onMouseEnter={() => setHoveredMovieId(movie.id)}
                                onMouseLeave={() => setHoveredMovieId(null)}
                                className="btn btn-sm remove"
                                title="Remove from favorites"
                            >
                                <i className={`bi ${hoveredMovieId === movie.id ? "bi-heart" : "bi-heart-fill"}`}></i>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
