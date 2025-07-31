import React from "react";
import Navigation from "../components/Navigation";
import CarouselHeaders from "../components/CarouselHeaders";
import CarouselCategories from "../components/CarouselCategories";
import LatestSelection from "../components/LatestSelection";
import TopRated from "../components/TopRated";
import Footer from "../components/Footer";
import { useRef } from "react";

const Accueil = () => {

    const topRatedRef = useRef(null);
    return (
        <div>
            <Navigation />
            <CarouselHeaders scrollToTopRated={() => topRatedRef.current?.scrollIntoView({ behavior: "smooth" })} />
            <CarouselCategories />
            <LatestSelection />
            <TopRated ref={topRatedRef}/>
            <Footer />
        </div>
    )
}


export default Accueil;