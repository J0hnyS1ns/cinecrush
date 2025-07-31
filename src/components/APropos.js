import React, { useState } from "react";
import Slider from "react-slick";
import "@fortawesome/fontawesome-free/css/all.min.css";

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

const teams = [
  {
    id: 1,
    image: require("../assets/CarouselTeams/Sophie.jpg"),
    name: "Sophie",
    about:
      "She's a curious and creative front-end integrator with a passion for smooth, thoughtful interfaces. In the CineCrush project, she's responsible for integrating the visual experience using SCSS and React. Her goal? That everything not only looks right, but feels right — intuitive, fluid, and just like home.",
    quote: "Good code whispers comfort into every click. If it feels natural, I’ve done my job.",
  },
  {
    id: 2,
    image: require("../assets/CarouselTeams/Charles.jpg"),
    name: "Charles",
    about:
      "Charles is a talented and passionate programmer, specializing in React for the design and development of software solutions. With deep expertise in this powerful JavaScript library, he excels in creating efficient, dynamic, and user-friendly applications. Always staying up to date with the latest trends in the React ecosystem, he fully commits to each project, ensuring a solid and reliable technical implementation.",
    quote: "The best way to learn coding is to play with it !",
  },
  {
    id: 3,
    image: require("../assets/CarouselTeams/Joanie.jpg"),
    name: "Joanie",
    about: "Joanie is a creative and motivated aspiring developer with a strong interest in web design. She enjoys combining technical skills with artistic vision to create clean, engaging, and user-focused websites. With a background rooted in creativity, her work is marked by attention to detail, visual harmony, and a thoughtful approach to problem-solving. As she nears the end of her training, Joanie is eager to contribute to meaningful projects and continue growing in the field of front-end development and design",
    quote: "Clean code. Clear design. Real impact.",
  },
];

const About = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState("fade-text");

  const settings = {
    centerMode: true,
    centerPadding: "0px",
    dots: false,
    infinite: true,
    slidesToShow: 2.5,
    slidesToScroll: 1,
    arrows: true,
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (_, newIndex) => {
      setFadeClass("fade-text"); // hide before slide changes
    },
    afterChange: (index) => {
      setActiveIndex(index);
      setTimeout(() => {
        setFadeClass("fade-text active"); // fade in
      }, 10);
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
  };

  

  return (
    <div className="container text-center about">
      <h1 className="text-white">
        THE TEAM <span className="corailf">BEHIND CINECRUSH</span>
      </h1>

      <div className="carousel-wrapper">
        <Slider {...settings}>
          {teams.map((team, index) => (
            <div
              key={team.id}
              className={`nofocus slide-wrapper ${
                index === activeIndex ? "active-slide" : "inactive-slide"
              }`}
            >
              <img src={team.image} alt={team.name} className="team-image" />
            </div>
          ))}
        </Slider>
      </div>

      <div className={`about-text ${fadeClass} mt-4`}>
        <h2>
          About <span className="corailf">{teams[activeIndex].name}</span>
        </h2>
        <p className="synopsis textgris moinslarge">
          {teams[activeIndex].about}
        </p>
        <p className="quote">
          <i className="fa-solid fa-quote-left quoteicon"></i>"
          {teams[activeIndex].quote}"
          <i className="fa-solid fa-quote-right quoteicon"></i>
        </p>
      </div>
    </div>
  );
};

export default About;
