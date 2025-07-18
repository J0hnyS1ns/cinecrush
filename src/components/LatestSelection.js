import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useHistory } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Flèche suivante personnalisée
const NextArrow = ({ onClick }) => (
  <div className="custom-arrow next" onClick={onClick}>
    <i className="fa-solid fa-chevron-right"></i>
  </div>
);

// Flèche précédente personnalisée
const PrevArrow = ({ onClick }) => (
  <div className="custom-arrow prev" onClick={onClick}>
    <i className="fa-solid fa-chevron-left"></i>
  </div>
);

const LatestSelection = () => {
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

    fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1", options)
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
    slidesToScroll: 5,
    arrows: true,
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const handleClick = (id) => {
    history.push(`/movie/${id}`);
  };

  return (
    <div className="container-fluid">
      <div className="mb-4 mt-5 titreS text-center">
        <span className="text-white">LATEST </span>
        <span> SELECTION</span>
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
                className="latest-image mx-auto"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default LatestSelection;
