import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import Slider from "react-slick";

const NextArrow = ({ onClick }) => (
  <div className="custom-arrow next" onClick={onClick}>
    <i className="fa-solid fa-chevron-right"></i>
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="custom-arrow prev" onClick={onClick}>
    <i className="fa-solid fa-chevron-left"></i>
  </div>
);

const ExpandableText = ({ text }) => {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef();

  const MAX_HEIGHT = 200; // hauteur fixe en pixels

  useEffect(() => {
    if (textRef.current) {
      setIsOverflowing(textRef.current.scrollHeight > MAX_HEIGHT);
    }
  }, [text]);

  return (
    <div className="expandable-wrapper">
      <div
        className={`descriptionacteur ${expanded ? "expanded" : "collapsed"}`}
   style={{ maxHeight: expanded ? "none" : "300px" }}

        ref={textRef}
      >
        {text}
        {!expanded && isOverflowing && <div className="fade-overlay" />}
      </div>
      {isOverflowing && (
        <button
          className="toggle-button"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
};


const FicheActeur = () => {
  const { id } = useParams();
  const [acteur, setActeur] = useState({});
  const [sameActor, setSameActor] = useState([]);
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
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1400,
        settings: { slidesToShow: 3.4         },
      },

     {
        breakpoint: 1200,
        settings: { slidesToShow: 3.1         },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
       {
        breakpoint: 992,
        settings: { slidesToShow: 2.2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1.6 },
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 1},
      }
    ],
  };

  const handleClick = (id) => {
    history.push(`/movie/${id}`);
  };

  return (
    <div className="container">
      {acteur.name ? (
        <div className="d-flex hautpage" style={{ gap: "6rem" }}>
          <div>
            <img
              src={
                acteur.profile_path
                  ? `https://image.tmdb.org/t/p/w500${acteur.profile_path}`
                  : require("../assets/Placeholder/Placeholder.jpg")
              }
              alt={acteur.name}
              className="placeholder2 grayscale actor"
            />
            <img
              src={
                acteur.profile_path
                  ? `https://image.tmdb.org/t/p/w500${acteur.profile_path}`
                  : require("../assets/Placeholder/Placeholder.jpg")
              }
              alt={acteur.name}
              className="placeholder2 reflection grayscale"
            />
          </div>

          <div>
            <h1 className="titlefilm">{acteur.name}</h1>
            <ExpandableText text={acteur.biography || "Biography not available."} />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {sameActor.length > 0 && (
        <div>
          <div className="mb-4 mt-5 titreR">
            <span className="text-white">WITH THE</span> SAME ACTOR
          </div>
          <div className="carousel-wrapper sameActeur">
            <Slider {...settings}>
              {sameActor.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => handleClick(movie.id)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                        : require("../assets/Placeholder/Placeholder.jpg")
                    }
                    alt={movie.title}
                    className="placeholder1 category-carte"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
};

export default FicheActeur;
