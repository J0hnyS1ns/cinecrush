import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const CategoriesPage = () => {
    const [movies, setMovies] = useState([]);
    const [selectedGenreId, setSelectedGenreId] = useState(null);
    const [genres, setGenres] = useState([]);
    const history = useHistory();

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTk4YTJkOGRlMzNiZjA0NWYyYmJkOTM3Y2JlY2UyMiIsIm5iZiI6MTc0ODI4NjAxNC41NTgsInN1YiI6IjY4MzRiYTNlM2UzYTI0MjUxYzA1NTc5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4MSufTQnFaG0ebxrKAa002ki2CTJOdE98l_DIHpZGfs'
        }
    };

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
            .then((res) => res.json())
            .then((data) => {
                setGenres(data.genres);
                if (data.genres.length > 0) {
                    setSelectedGenreId(data.genres[0].id);
                }
            })
            .catch((err) => console.error("Error :", err));
    }, []);

    useEffect(() => {
        if (selectedGenreId) {
            fetch(
                `https://api.themoviedb.org/3/discover/movie?with_genres=${selectedGenreId}&language=en-US`, options)
                .then((res) => res.json())
                .then((data) => setMovies(data.results))
                .catch((err) => console.error("Error movies :", err));
        }
    }, [selectedGenreId]);

    const selectedGenre = genres.find((genre) => genre.id === selectedGenreId);

    const handleClick = (id) => {
        history.push(`/movie/${id}`);
    }

    return (
        <div className="container-fluid">
            <div className="headerImages">
                <img
                    src={require("../assets/CarouselCategories/image-category.png")}
                    alt="Banner"
                    className="catImage" />
                {selectedGenre && (
                    <h2 className="category-nom2">{selectedGenre.name}</h2>
                )}
            </div>
            <div className="container containerCategories">
                <div className="categoriesMovies">
                    <ul className="text-white">
                        {genres.map((genre) => (
                            <li
                                key={genre.id}
                                onClick={() => setSelectedGenreId(genre.id)}
                                className={selectedGenreId === genre.id ? "active" : ""}>
                                {genre.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <div className="selectedMovies">
                        {movies.slice(0, 9).map((movie) => (
                            <div key={movie.id} className="posterMovies" onClick={() => handleClick(movie.id)}
                                style={{ cursor: "pointer" }}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoriesPage;
