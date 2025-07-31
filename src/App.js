import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Categories from "./pages/Categories";
import FicheFilm from "./pages/FicheFilm";
import Acteur from "./pages/FicheActeur";
import APropos from "./pages/APropos";
import Recherche from "./pages/Recherche";
import Favorite from "./pages/Favoris";


const App = () => {


  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Accueil} />
        <Route path="/Categories" exact component={Categories} />
        <Route path="/movie/:id" exact component={FicheFilm} />
        <Route path="/acteur/:id" exact component={Acteur} />
        <Route path="/About" exact component={APropos} />
        <Route path="/Recherche" exact component={Recherche} />
        <Route path="/Favorites" component={Favorite} />
      </Switch>
    </BrowserRouter>
  )
}

//Export du composant
export default App;