
const Footer = () => {
    return (
        <div className="bgcolor">
            <div className="container mt-5 py-2">
                <div className="row align-items-end">

                    <div className="col-md-6">
                        <div className="mb-md-0">
                            <div className="logo-container">
                                <img src="../assets/Logo/logo.svg" alt="CineCrush" />
                            </div>
                        </div>
                        <p className="mb-0 fst-italic">
                            <span className="slogan-part1">Every movie, a new </span>
                            <span className="slogan-part2">crush.</span>
                        </p>
                    </div>


                    <div className="col-md-6">
                        <div className="text-md-end">
                            <div className="mb-0">
                                <i className="bi bi-facebook reseaux me-3"></i>
                                <i className="bi bi-instagram reseaux"></i>
                            </div>
                            <div className="text-light">
                                <small>
                                    © 2025 Cinecrush <span className="splitter mx-2">|</span> All rights reserved
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;