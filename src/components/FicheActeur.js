import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Slider from "react-slick";


const FicheActeur = () => {
    const { id } = useParams();
    const [acteur, setActeur] = useState({});
    const [sameActor, setSameActor] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTk4YTJkOGRlMzNiZjA0NWYyYmJkOTM3Y2JlY2UyMiIsIm5iZiI6MTc0ODI4NjAxNC41NTgsInN1YiI6IjY4MzRiYTNlM2UzYTI0MjUxYzA1NTc5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4MSufTQnFaG0ebxrKAa002ki2CTJOdE98l_DIHpZGfs'
            }
        };

        fetch(`https://api.themoviedb.org/3/person/${id}?language=en-US`, options)
            .then((res) => res.json())
            .then((data) => {
                setActeur(data);
            })
            .catch((err) => console.error("Error :", err));

        fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?language=en-US`, options)
            .then((res) => res.json())
            .then((data) => {
                setSameActor(data.cast);
            })
            .catch((err) => console.error(err));

    }, [id]);

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
        <div className="container">
            {acteur.name ? (
                <div className="d-flex">
                    <img src={acteur.profile_path
                        ? `https://image.tmdb.org/t/p/w500${acteur.profile_path}`
                        : require("../assets/Placeholder/Placeholder.png")}
                        alt={acteur.title}
                        className="d-flex placeholder2" />
                    <div>
                        <h1> {acteur.name} </h1>
                        <p> {acteur.biography}</p>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            {sameActor.length > 0 && (
                <div>
                    <div className="my-2">
                        <span className="text-white">WITH THE SAME ACTOR </span>
                    </div>
                    <Slider {...settings}>
                        {sameActor.map((actor) => (
                            <div key={actor.id} className="" onClick={() => handleClick(actor.id)} style={{ cursor: "pointer" }}>
                                <img
                                    src={actor.poster_path
                                        ? `https://image.tmdb.org/t/p/w300${actor.poster_path}`
                                        : require("../assets/Placeholder/Placeholder.png") }      
                                    alt={actor.title}
                                    className="placeholder1" />
                            </div>
                        ))}
                    </Slider>
                </div>
            )}
        </div>
    );
};

export default FicheActeur;