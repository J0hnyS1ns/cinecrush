import { NavLink, useHistory } from "react-router-dom";
import { useState } from "react";

const Navigation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const history = useHistory();

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      history.push(`/Recherche?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
      setShowSearch(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="bgcolor-flou">
      <div className="container">
        <nav className="navbar py-3">

          {/* MOBILE: Top row */}
          <div className="d-flex d-lg-none justify-content-between align-items-center w-100">
            {/* Toggle bouton */}
            <button
              className="navbar-toggler border-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mobileNav"
              aria-controls="mobileNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Logo centré */}
        <NavLink exact to="/" className="nav-link p-0">
  <img src="/assets/Logo/Logo.svg" alt="logo" style={{ height: "40px" }} />
</NavLink>

            {/* Loupe + Coeur à droite */}
            <div className="mobile-icons">
              <i
                className="bi bi-search text-white"
                style={{ cursor: "pointer", fontSize: "20px" }}
                onClick={() => setShowSearch(!showSearch)}
              ></i>
              <i
                className="bi bi-heart-fill coeur"
                style={{ cursor: "pointer" }}
                onClick={() => history.push("/Favorites")}
              ></i>
            </div>
          </div>

          {/* MOBILE: Menu collapse */}
          <div className="collapse navbar-collapse d-lg-none mt-3" id="mobileNav">
            <NavLink exact to="/About" activeClassName="nav-active" className="text-white nav-link">
              ABOUT
            </NavLink>
            <NavLink exact to="/Categories" activeClassName="nav-active" className="text-white nav-link">
              CATEGORIES
            </NavLink>
          </div>

          {/* MOBILE: Search bar visible en-dessous */}
          {showSearch && (
            <div className="search-bar-mobile d-lg-none">
              <div className="input-group w-100" style={{ maxWidth: 400 }}>
                <input
                  type="text"
                  className="form-control fond-search py-2"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Rechercher..."
                />
                <span
                  className="input-group-text fond-loupe"
                  onClick={handleSearch}
                  style={{ cursor: "pointer" }}
                >
                  <i className="bi bi-search"></i>
                </span>
              </div>
            </div>
          )}

          {/* DESKTOP: structure inchangée */}
          <div className="d-none d-lg-flex w-100 justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-5">
              <NavLink exact to="/" activeClassName="nav-active" className="nav-link p-0">
                <img src="/assets/Logo/Logo.svg" alt="logo" style={{ height: "40px" }} />
              </NavLink>
              <NavLink exact to="/About" activeClassName="nav-active" className="text-white nav-link navlink">
                ABOUT
              </NavLink>
              <NavLink exact to="/Categories" activeClassName="nav-active" className="text-white nav-link navlink">
                CATEGORIES
              </NavLink>
            </div>

            <div className="input-group d-flex align-items-center search-bar">
              <input
                type="text"
                className="form-control fond-search py-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <span className="input-group-text fond-loupe" onClick={handleSearch} style={{ cursor: "pointer" }}>
                <i className="bi bi-search"></i>
              </span>
            </div>

            <span
              className="ms-4"
              style={{ height: 30, cursor: "pointer" }}
              onClick={() => history.push("/Favorites")}
            >
              <i className="bi bi-heart-fill coeur"></i>
            </span>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
