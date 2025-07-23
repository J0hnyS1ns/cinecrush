import React from "react";
import Slider from "react-slick";

const slides = [
    {
        id: 1,
        image: require("../assets/CarouselHeaders/stranger-things.jpg"),
        title: "Stranger Things"
    },
    {
        id: 2,
        image: require("../assets/CarouselHeaders/fight-club.jpg"),
        title: "Fight Club"
    },
    {
        id: 3,
        image: require("../assets/CarouselHeaders/dark-knight.jpg"),
        title: "Dark Knight"
    },
];

const CarouselHeaders = () => {
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        pauseOnHover: false,
    };

return (
  <div className="carousel-top">
    <div className="overlay-text">
      <h1 className="headertitle">
        Check out the <br/> <span className="corailp"> TOP-RATED </span> SERIES!
      </h1>
      <button className="buttonborder buttonheader">See more</button>
    </div>
        <Slider {...settings}>
            {slides.map((item) => (
        <div key={item.id} className="top-slide">
          <div className="img-container">
            <img src={item.image} alt={item.title} />
          </div>
        </div>
          ))}
    </Slider>
    
  </div>
);

};

export default CarouselHeaders;