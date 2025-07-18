import { NavLink, useHistory } from "react-router-dom";
import { useState } from "react";

const Navigation = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const history = useHistory();

    const handleSearch = () => {
        if (searchTerm.trim() !== "") {
            history.push(`/Recherche?q=${encodeURIComponent(searchTerm)}`);
            setSearchTerm("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSearch();
    };

    return (
        <div className="bgcolor-flou">
            <div className="container">
                <nav className="d-flex align-items-center navbar py-3">
                    <div className="d-flex align-items-center gap-5">
                        <NavLink exact to="/" activeClassName="nav-active" className="nav-link p-0">
                            <img src="../assets/Logo/logo.svg" alt="logo" style={{ height: "40px" }} />
                        </NavLink>
                        <NavLink exact to="/About" activeClassName="nav-active" className="text-white nav-link">
                            ABOUT
                        </NavLink>
                        <NavLink exact to="/Categories" activeClassName="nav-active" className="text-white nav-link">
                            CATEGORIES
                        </NavLink>
                    </div>

                    <div className="input-group d-flex align-items-center" style={{ width: 380 }}>

                        <input
                            type="text"
                            className="form-control fond-search py-2"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown} />
                        <span className="input-group-text fond-loupe" onClick={handleSearch} style={{ cursor: "pointer" }}>
                            <i className="bi bi-search"></i>
                        </span>
                    </div>
                    <span className="ms-4" style={{ height: 30 }}>
                        <i className="bi bi-heart-fill coeur"></i>
                    </span>
                </nav>
            </div>
        </div>
    )
};

export default Navigation;