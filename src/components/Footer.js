import React, { useEffect, useRef, useState } from "react";

const Footer = () => {
    const logoRef = useRef(null);
    const [logoVisible, setLogoVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setLogoVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1,
            }
        );

        if (logoRef.current) {
            observer.observe(logoRef.current);
        }

        return () => {
            if (logoRef.current) {
                observer.unobserve(logoRef.current);
            }
        };
    }, []);

    return (
        <div className="footer">
            <div className="container">
                <div className="row align-items-end">

                    <div className="col-md-6">
                        <div className="mb-md-0">
                            <div
                                className={`logo-container transition-logo ${
                                    logoVisible ? "visible" : ""
                                }`}
                                ref={logoRef}
                            >
                                <img src="/assets/Logo/Logo.svg" alt="CineCrush" />
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
