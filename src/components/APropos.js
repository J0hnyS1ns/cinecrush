import React, { useState } from "react";
import Slider from "react-slick";

const teams = [
    {
        id: 1,
        image: require("../assets/CarouselTeams/Sophie.jpg"),
        name: "Sophie",
        about: "",
        quote: ""
    },
    {
        id: 2,
        image: require("../assets/CarouselTeams/Charles.jpg"),
        name: "Charles",
        about: "Charles is a talented and passionate programmer, specializing in React for the design and development of software solutions. With deep expertise in this powerful JavaScript library, he excels in creating efficient, dynamic, and user-friendly applications. Always staying up to date with the latest trends in the React ecosystem, he fully commits to each project, ensuring a solid and reliable technical implementation.",
        quote: "The best way to learn coding is to play with it !"
    },
    {
        id: 3,
        image: require("../assets/CarouselTeams/Joanie.jpg"),
        name: "Joanie",
        about: "",
        quote: ""
    },
];

const About = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const settings = {
        centerMode: true,
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 2,
        arrows: true,
        initialSlide: 0,
        speed: 500,
        beforeChange: (oldIndex, newIndex) => {
            setActiveIndex(newIndex);
        },
        responsive: [
            {
                breakpoint: 768,
                settings: { slidesToShow: 1, centerMode: false },
            },
        ],
    };

    return (
        <div className="container text-center about">
            <h1>THE TEAM <span className="">BEHIND CINECRUSH</span></h1>

            <div className="">
                <Slider {...settings}>
                    {teams.map((team) => (
                        <div key={team.id} className="">
                            <div className="">
                                <img src={team.image} alt={team.name} />
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

            {teams[activeIndex] && (
                <div className="">
                    <h2>About <span className="">{teams[activeIndex].name}</span></h2>
                    <p className="">{teams[activeIndex].about}</p>
                    <p className="">"{teams[activeIndex].quote}"</p>
                </div>
            )}
        </div>
    )
};

export default About;