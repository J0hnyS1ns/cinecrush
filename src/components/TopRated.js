import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useHistory } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css"; // Import des icônes
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Flèche suivante avec icône Font Awesome
const NextArrow = ({ onClick }) => (
  <div className="custom-arrow next" onClick={onClick}>
    <i className="fa-solid fa-chevron-right"></i>
  </div>
);

// Flèche précédente avec icône Font Awesome
const PrevArrow = ({ onClick }) => (
  <div className="custom-arrow prev" onClick={onClick}>
    <i className="fa-solid fa-chevron-left"></i>
  </div>
);

const TopRated = () => {
  const [movies, setMovies] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTk4YTJkOGRlMzNiZjA0NWYyYmJkOTM3Y2JlY2UyMiIsIm5iZiI6MTc0ODI4NjAxNC41NTgsInN1YiI6IjY4MzRiYTNlM2UzYTI0MjUxYzA1NTc5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4MSufTQnFaG0ebxrKAa002ki2CTJOdE98l_DIHpZGfs",
      },
    };

    fetch("https://api.themoviedb.org/3/movie/top_rated?language=en&page=1", options)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch((err) => console.error("Error :", err));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5.7,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    arrows: true,
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.5,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.2,
          centerPadding: "20px",
        },
      },
    ],
  };

  const handleClick = (id) => {
    history.push(`/movie/${id}`);
  };

  return (
    <div className="container-fluid">
      <div className="mb-4 mt-5 titreR text-center">
        <span className="text-white">TOP </span>
        <span> RATED</span>
      </div>
      <div className="carousel-wrapper">
        <Slider {...settings}>
          {movies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => handleClick(movie.id)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="top-rated-image mx-auto"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TopRated;
