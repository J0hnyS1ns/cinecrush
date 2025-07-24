import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

const CategoriesPage = () => {
    const [movies, setMovies] = useState([]);
    const [selectedGenreId, setSelectedGenreId] = useState(null);
    const [genres, setGenres] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const history = useHistory();
    const location = useLocation();

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
                if (location.state?.genreId) {
                    setSelectedGenreId(parseInt(location.state.genreId));
                } else if (data.genres.length > 0) {
                    setSelectedGenreId(data.genres[0].id);
                }
            })
            .catch((err) => console.error("Error genres:", err));
    }, [location.state]);

    useEffect(() => {
        if (selectedGenreId) {
            fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${selectedGenreId}&language=en-US`, options)
                .then((res) => res.json())
                .then((data) => {
                    setMovies(data.results);
                    setCurrentPage(1);
                })
                .catch((err) => console.error("Error movies :", err));
        }
    }, [selectedGenreId]);

    const selectedGenre = genres.find((genre) => genre.id === selectedGenreId);

    const handleClick = (id) => {
        history.push(`/movie/${id}`);
    }

    const indexOfLastMovie = currentPage * itemsPerPage;
    const indexOfFirstMovie = indexOfLastMovie - itemsPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
    const totalPages = Math.ceil(movies.length / itemsPerPage);

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="container-fluid">
            <div className="headerImages">
                <img
                    src={require("../assets/CarouselCategories/image-category.png")}
                    alt="Banner"
                    className="catImage" />
                <h2 className="category-nom2">
                    {selectedGenre?.name || location.state?.genreName || "Categories"}
                </h2>
            </div>
            <div className="container containerCategories">
                <div className="categoriesMovies">
                    <ul className="text-white">
                        {genres.map((genre) => (
                            <li
                                key={genre.id}
                                onClick={() => {
                                    setSelectedGenreId(genre.id);
                                    setCurrentPage(1);
                                }}
                                className={selectedGenreId === genre.id ? "active" : ""}>
                                {genre.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <div className="selectedMovies">
                        {currentMovies.map((movie) => (
                            <div key={movie.id} className="posterMovies" onClick={() => handleClick(movie.id)}
                                style={{ cursor: "pointer" }}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title} />
                            </div>
                        ))}
                    </div>
                    <div className="">
                        {pages.map((pageNumber) => (
                            <button
                                key={pageNumber}
                                onClick={() => setCurrentPage(pageNumber)}
                                className="">
                                {pageNumber}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoriesPage;
