import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

const Search = () => {
    const location = useLocation();
    const history = useHistory();
    const query = new URLSearchParams(location.search).get("q");
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTk4YTJkOGRlMzNiZjA0NWYyYmJkOTM3Y2JlY2UyMiIsIm5iZiI6MTc0ODI4NjAxNC41NTgsInN1YiI6IjY4MzRiYTNlM2UzYTI0MjUxYzA1NTc5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4MSufTQnFaG0ebxrKAa002ki2CTJOdE98l_DIHpZGfs",
        },
    };

    useEffect(() => {
        if (query) {
            fetch(
                `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
                    query
                )}&language=en-US`,
                options
            )
                .then((res) => res.json())
                .then((data) => {
                    setResults(data.results);
                    setCurrentPage(1);
                })
                .catch((err) => console.error(err));
        }
    }, [query]);

    const handleClick = (movie) => {
        history.push(`/movie/${movie.id}`);
    };

    const indexOfLastMovie = currentPage * itemsPerPage;
    const indexOfFirstMovie = indexOfLastMovie - itemsPerPage;
    const currentMovies = results.slice(indexOfFirstMovie, indexOfLastMovie);
    const totalPages = Math.ceil(results.length / itemsPerPage);

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="container-fluid mt-4">
            <div className="headerImages">
                <img
                    src={require("../assets/CarouselCategories/image-category.png")}
                    alt="Banner"
                    className="catImage"
                />
                {query && <h2 className="category-nom2 caps">SEARCHING "{query}"</h2>}
            </div>

            {results.length > 0 ? (
                <div className="container pt-5">
                    <p className="text-white petit">Results : {results.length}</p>

                    <div>
                        <div className="selectedMovies4">
                            {currentMovies.map((movie) => (
                                <div
                                    key={movie.id}
                                    className="posterMovies"
                                    onClick={() => handleClick(movie)}
                                >
                                    <div className="img-container">
                                        <img
                                            className="movie-image"
                                            src={
                                                movie.poster_path
                                                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                                    : require("../assets/Placeholder/Placeholder.png")
                                            }
                                            alt={movie.title}
                                        />
                                        <div className="movie-title">{movie.title}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 pagination-container">
                            {pages.map((pageNumber) => (
                                <button
                                    key={pageNumber}
                                    onClick={() => setCurrentPage(pageNumber)}
                                    className={`changementPage ${currentPage === pageNumber ? "activePage" : ""}`} 
                                >
                                    {pageNumber}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-white text-center mt-5">No results found.</p>
            )}
        </div>
    );
};

export default Search;
