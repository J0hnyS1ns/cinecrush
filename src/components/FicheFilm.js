import React, { useState, useEffect } from "react";
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

const Movie = () => {
  const { id } = useParams();
  const [ficheFilm, setFicheFilm] = useState({});
  const [acteurs, setActeurs] = useState([]);
  const [sameCategory, setSameCategory] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false); // <-- état modale trailer
  const [liked, setLiked] = useState(false);
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

    const sameCategory = (genreId, currentMovieId) => {
      fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en-US`,
        options
      )
        .then((res) => res.json())
        .then((data) =>
          setSameCategory(data.results.filter((movie) => movie.id !== currentMovieId))
        )
        .catch((err) => console.error("Error :", err));
    };

    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then((res) => res.json())
      .then((data) => {
        setFicheFilm(data);
        if (data.genres?.[0]?.id) {
          sameCategory(data.genres[0].id, data.id);
        }
        const stored = JSON.parse(localStorage.getItem("likedMovies")) || [];
        const isAlreadyLiked = stored.some((m) => m.id === data.id);
        setLiked(isAlreadyLiked);
      })
      .catch((err) => console.error("Error :", err));

    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options) // <-- fetch trailer video key
      .then((res) => res.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          // prendre la première vidéo type trailer
          const trailer = data.results.find(v => v.type === "Trailer" && v.site === "YouTube");
          if (trailer) setTrailerKey(trailer.key);
        }
      })
      .catch((err) => console.error("Error :", err));

    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options)
      .then((res) => res.json())
      .then((data) => {
        setActeurs(data.cast);
      })
      .catch((err) => console.error("Error :", err));
  }, [id]);

  const handleLike = () => {
    setLiked(!liked);
    const stored = JSON.parse(localStorage.getItem("likedMovies")) || [];

    if (!liked) {
      const newList = [...stored, ficheFilm];
      localStorage.setItem("likedMovies", JSON.stringify(newList));
    } else {
      const filtered = stored.filter((m) => m.id !== ficheFilm.id);
      localStorage.setItem("likedMovies", JSON.stringify(filtered));
    }
  };

  // état pour stocker la clé youtube du trailer
  const [trailerKey, setTrailerKey] = useState(null);

  const stars = (ratingSur10) => {
    const ratingSur5 = (ratingSur10 / 10) * 5;
    const fullStars = Math.floor(ratingSur5);
    const halfStar = ratingSur5 % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div style={{ display: "flex", gap: "10px" }}>
        {Array(fullStars)
          .fill()
          .map((_, i) => (
            <i key={`full-${i}`} className="bi bi-star-fill "></i>
          ))}
        {halfStar && <i className="bi bi-star-half"></i>}
        {Array(emptyStars)
          .fill()
          .map((_, i) => (
            <i key={`empty-${i}`} className="bi bi-star"></i>
          ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "Décember",
    ];
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
    <div className="container">
      {ficheFilm.title ? (
        <div className="d-flex hautpage" style={{ gap: "6rem" }}>
          <div>
            <img
              src={
                ficheFilm.poster_path
                  ? `https://image.tmdb.org/t/p/w500${ficheFilm.poster_path}`
                  : require("../assets/Placeholder/Placeholder.jpg")
              }
              alt={ficheFilm.title}
              className="placeholder2"
            />
            <img
              src={
                ficheFilm.poster_path
                  ? `https://image.tmdb.org/t/p/w500${ficheFilm.poster_path}`
                  : require("../assets/Placeholder/Placeholder.jpg")
              }
              alt={ficheFilm.title}
              className="placeholder2 reflection"
            />
          </div>
          <div>
            <span className="titlefilm">{ficheFilm.title}</span>{" "}
            <span className="heart" onClick={handleLike} style={{ cursor: "pointer" }}>
              <i className={liked ? "bi bi-heart-fill" : "bi bi-heart"}></i>
            </span>
            <span className="ratingfilm">{stars(ficheFilm.vote_average)}</span>
            <div className="mb-2 dateetgenre">
              <span
                className="genrefilm"
                onClick={() =>
                  history.push({
                    pathname: "/Categories",
                    state: {
                      genreId: ficheFilm.genres?.[0]?.id,
                      genreName: ficheFilm.genres?.[0]?.name,
                    },
                  })
                }
                style={{ cursor: "pointer" }} >
                {ficheFilm.genres?.[0]?.name}
              </span>
              <span className="separation">|</span>
              <span className="datefilm"> {formatDate(ficheFilm.release_date)} </span>
            </div>
            <p className="textparagraphe synopsis"> {ficheFilm.overview} </p>

            {/* début des boutons à lier avec les vidéos */}
            <div className="blocbuttons">
              <button className="buttonfull buttonpetit">Play movie</button>
              <button
                className="buttonborder buttonpetit"
                onClick={() => setShowTrailer(true)}
                disabled={!trailerKey} // désactivé si pas de trailer
              >
                Watch trailer
              </button>
            </div>
            {/* fin des boutons à lier avec les vidéos */}

            <div className="d-flex row acteurs">
              {acteurs.slice(0, 4).map((acteur) => (
                <div
                  key={acteur.id}
                  className="col text-center"
                  onClick={() => history.push(`/acteur/${acteur.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="placeholder3">
                    <img
                      src={
                        acteur.profile_path
                          ? `https://image.tmdb.org/t/p/w200${acteur.profile_path}`
                          : require("../assets/Placeholder/Placeholder.jpg")
                      }
                      alt={acteur.title}
                      className="d-flex img-inside"
                    />
                  </div>
                  <span className="acteurname"> {acteur.name} </span>
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
          <div className="mb-4 mt-5 titreR">
            <span className="text-white">IN THE </span>
            <span> SAME CATEGORY</span>
          </div>
          <div className="carousel-wrapper">
            <Slider {...settings}>
              {sameCategory.map((movie) => (
                <div
                  key={movie.id}
                  className=""
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

      {/* MODALE trailer */}
      {showTrailer && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            backgroundColor: "rgba(0,0,0,0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowTrailer(false)} // fermer au clic sur overlay
        >
          <div
            style={{ position: "relative", width: "80%", maxWidth: "900px" }}
            onClick={(e) => e.stopPropagation()} // empêcher fermeture quand clique dans la vidéo
          >
            <button
              onClick={() => setShowTrailer(false)}
              className="xfermeture"
              aria-label="Close trailer"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <iframe
              width="100%"
              height="500px"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Movie;
