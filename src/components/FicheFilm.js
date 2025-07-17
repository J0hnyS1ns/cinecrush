import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Movie = () => {
    const { id } = useParams();
    const [ficheFilm, setFicheFilm] = useState({});
    const [acteurs, setActeurs] = useState([]);
    const [sameCategory, setSameCategory] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTk4YTJkOGRlMzNiZjA0NWYyYmJkOTM3Y2JlY2UyMiIsIm5iZiI6MTc0ODI4NjAxNC41NTgsInN1YiI6IjY4MzRiYTNlM2UzYTI0MjUxYzA1NTc5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4MSufTQnFaG0ebxrKAa002ki2CTJOdE98l_DIHpZGfs'
            }
        };

        const sameCategory = (genreId, currentMovieId) => {
            fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en-US`, options)
                .then((res) => res.json())
                .then((data) =>
                    setSameCategory(data.results.filter((movie) => movie.id !== currentMovieId))
                )
                .catch((err) => console.error("Error :", err));
        };

        fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
            .then((res) => res.json())
            .then((data) => {
                setFicheFilm(data)
                if (data.genres?.[2]?.id) {
                    sameCategory(data.genres[2].id, data.id);
                }
            })
            .catch((err) => console.error("Error :", err));

        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options)
            .then((res) => res.json())
            .then((data) => { setActeurs(data.cast) })
            .catch(err => console.error("Error :", err));
    }, [id]);


    const stars = (ratingSur10) => {
        const ratingSur5 = (ratingSur10 / 10) * 5;
        const fullStars = Math.floor(ratingSur5);
        const halfStar = ratingSur5 % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <div style={{ display: "flex", gap: "3px" }}>
                {Array(fullStars).fill().map((_, i) => (
                    <i key={`full-${i}`} className="bi bi-star-fill "></i>
                ))}
                {halfStar && <i className="bi bi-star-half"></i>}
                {Array(emptyStars).fill().map((_, i) => (
                    <i key={`empty-${i}`} className="bi bi-star"></i>
                ))}
            </div>
        );
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Date inconnue';
        const date = new Date(dateString);
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Décember'];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${month} ${day} ${year}`;
    };

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
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
        <div className="container mt-4">
            
                {ficheFilm.title ? (
                    <div className="d-flex gap-5">
                        <div className="">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${ficheFilm.poster_path}`}
                                alt={ficheFilm.title}
                                className="" />
                        </div>
                        <div className="">
                            <span>{ficheFilm.title} <i className="bi bi-heart"></i></span>
                            <span>{stars(ficheFilm.vote_average)}</span>
                            <div className="mb-2">
                                <span> {ficheFilm.genres?.[2]?.name} </span> |
                                <span> {formatDate(ficheFilm.release_date)} </span>
                            </div>
                            <p> {ficheFilm.overview} </p>
                            <div className="d-flex">
                                {acteurs.slice(0, 4).map((acteur) => (
                                    <div key={acteur.id} className="" onClick={() => history.push(`/acteur/${acteur.id}`)} style={{ cursor: "pointer" }}>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w200${acteur.profile_path}`}
                                            alt={acteur.title}
                                            className="d-flex" />
                                        <span className=""> {acteur.name} </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}


            {sameCategory.length > 0 && (
                <div>
                    <div className="my-2">
                        <span className="text-white">IN THE SAME CATEGORY </span>
                    </div>
                    <Slider {...settings}>
                        {sameCategory.map((movie) => (
                            <div key={movie.id} className="" onClick={() => handleClick(movie.id)} style={{ cursor: "pointer" }}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                    alt={movie.title}
                                    className="" />
                            </div>
                        ))}
                    </Slider>
                </div>
            )}
        </div>
    )
};

export default Movie;
