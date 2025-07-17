import React from "react";
import Navigation from "../components/Navigation";
import CarouselHeaders from "../components/CarouselHeaders";
import CarouselCategories from "../components/CarouselCategories";
import LatestSelection from "../components/LatestSelection";
import TopRated from "../components/TopRated";
import Footer from "../components/Footer";

const Accueil = () => {
    return (
        <div>
            <Navigation />
            <CarouselHeaders />
            <CarouselCategories />
            <LatestSelection />
            <TopRated />
            <Footer />
        </div>
    )
}


export default Accueil;