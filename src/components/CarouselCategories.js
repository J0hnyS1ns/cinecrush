import React, { useState, useEffect } from "react";
import Slider from "react-slick";


const CarouselCategories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTk4YTJkOGRlMzNiZjA0NWYyYmJkOTM3Y2JlY2UyMiIsIm5iZiI6MTc0ODI4NjAxNC41NTgsInN1YiI6IjY4MzRiYTNlM2UzYTI0MjUxYzA1NTc5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4MSufTQnFaG0ebxrKAa002ki2CTJOdE98l_DIHpZGfs'
            }
        };

        fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
            .then((res) => res.json())
            .then((data) => {
                setCategories(data.genres);
            })
            .catch((err) => console.error("Error :", err));
    }, []);

    const category = [
        {
            id: 28,
            image: require("../assets/CarouselCategories/Action.jpg")
        },
        {
            id: 12,
            image: require("../assets/CarouselCategories/Adventure.jpg")
        },
        {
            id: 16,
            image: require("../assets/CarouselCategories/Animation.jpg")
        },
        {
            id: 35,
            image: require("../assets/CarouselCategories/Comedy.jpg")
        },
        {
            id: 80,
            image: require("../assets/CarouselCategories/Crime.jpg")
        },
        {
            id: 99,
            image: require("../assets/CarouselCategories/Documentary.jpg")
        },
        {
            id: 18,
            image: require("../assets/CarouselCategories/Drama.jpg")
        },
        {
            id: 10751,
            image: require("../assets/CarouselCategories/Family.jpg")
        },
        {
            id: 14,
            image: require("../assets/CarouselCategories/Fantasy.jpg")
        },
        {
            id: 36,
            image: require("../assets/CarouselCategories/History.jpg")
        },
        {
            id: 27,
            image: require("../assets/CarouselCategories/Horror.jpg")
        },
        {
            id: 10402,
            image: require("../assets/CarouselCategories/Music.jpg")
        },
        {
            id: 9648,
            image: require("../assets/CarouselCategories/Mystery.jpg")
        },
        {
            id: 10749,
            image: require("../assets/CarouselCategories/Romance.jpg")
        },
        {
            id: 878,
            image: require("../assets/CarouselCategories/Science-Fiction.jpg")
        },
        {
            id: 10770,
            image: require("../assets/CarouselCategories/TV-Movie.jpg")
        },
        {
            id: 53,
            image: require("../assets/CarouselCategories/Thriller.jpg")
        },
        {
            id: 10752,
            image: require("../assets/CarouselCategories/War.jpg")
        },
        {
            id: 37,
            image: require("../assets/CarouselCategories/Western.jpg")
        }
    ];
    

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 5,
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
        ],
    };
    return (
    <div className="container-fluid">
        <Slider {...settings}>
            {categories.map((cat) => {
                const categoryImage = category.find(c => c.id === cat.id)?.image;
                return (
                    <div key={cat.id} className="category-carte px-2">
                        {categoryImage && (
                            <div className="img-container">
                                <img
                                    src={categoryImage}
                                    alt={cat.name}
                                    className="category-image"
                                />
                                {/* Tu peux aussi ajouter un texte ici si tu veux */}
                            </div>
                        )}
                        <h3 className="category-nom">{cat.name}</h3>
                    </div>
                );
            })}
        </Slider>
    </div>
);

};

export default CarouselCategories;
