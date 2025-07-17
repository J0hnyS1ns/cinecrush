import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useHistory } from "react-router-dom";

const TopRated = () => {
    const [movies, setMovies] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTk4YTJkOGRlMzNiZjA0NWYyYmJkOTM3Y2JlY2UyMiIsIm5iZiI6MTc0ODI4NjAxNC41NTgsInN1YiI6IjY4MzRiYTNlM2UzYTI0MjUxYzA1NTc5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4MSufTQnFaG0ebxrKAa002ki2CTJOdE98l_DIHpZGfs'
            }
        };

        fetch('https://api.themoviedb.org/3/movie/top_rated?language=en&page=1', options)
            .then((res) => res.json())
            .then((data) => {
                setMovies(data.results);
            })
            .catch((err) => console.error("Error :", err));
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 5,
        arrows: true,
        speed: 500,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 3 },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 1 },
            },
        ]
    };

    const handleClick = (id) => {
        history.push(`/movie/${id}`);
    }

    return (
        <div className="container-fluid">
            <div className="my-2 titreR text-center">
                <span className="text-white">TOP </span>
                <span> RATED</span>
            </div>
            <Slider {...settings}>
                {movies.map((movie) => (
                    <div key={movie.id} className="" onClick={() => handleClick(movie.id)} style={{ cursor: "pointer" }}>
                        <img
                            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                            alt={movie.title}
                            className="top-rated-image mx-auto"
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default TopRated;
