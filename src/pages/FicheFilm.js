import React from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Movie from "../components/FicheFilm";



const FicheFilm = () => {
    return (
        <div>
            <Navigation />
            <Movie />
            <Footer />
        </div>
    )
}


export default FicheFilm;