import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <div className="bgcolor">
            <div className="container">
                <nav className="d-flex align-items-center navbar">
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

                    <div className="input-group d-flex align-items-center" style={{ width: 450 }}>
                        <input type="text" className="form-control border-end-0" placeholder="Rechercher" />
                        <span className="input-group-text bg-white">
                            <i className="bi bi-search"></i>
                        </span>
                        <span className="ms-4" style={{ height: 30 }}>
                            <i className="bi bi-heart-fill coeur"></i>
                        </span>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navigation;