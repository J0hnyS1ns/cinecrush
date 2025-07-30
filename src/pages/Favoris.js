import React from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Favorites from "../components/Favoris"; // garde ton import comme ça

const Favorite = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navigation />
            <main className="flex-grow-1">
                <Favorites />
            </main>
            <Footer />
        </div>
    );
};

export default Favorite;
