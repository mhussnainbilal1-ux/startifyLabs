"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [activeMenu, setActiveMenu] = useState("home")


    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav
            id="navbar"
            
            className="navbar navbar-expand-lg fixed-top"
            style={{
                transition: "all 0.3s ease",
                backgroundColor: isSticky ? "#ffffff" : "transparent",
                boxShadow: isSticky
                    ? "0 4px 20px rgba(0,0,0,0.08)"
                    : "none",
                padding: isSticky ? "12px 0" : "20px 0",
                zIndex: 9999,
            }}
        >

            <div className="container">
                {/* Brand */}
                <Link href="#home" className="navbar-brand">
                    <Logo />
                </Link>

                {/* Mobile Toggle */}
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggle-icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    </span>
                </button>

                {/* Menu */}
                <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>

                    <style jsx global>{`
                    .nav-link::before {
                    content: none !important;
                    }

                    .nav-link {
                    position: relative;
                    }


                    `}</style>

                    <ul className="navbar-nav mx-auto navbar-center mt-lg-0 mt-2">

                        <li className="nav-item">
                            <Link className={activeMenu === "home" ? " nav-link active" : "nav-link"} href="#home" onClick={() => { setActiveMenu("home"); setIsOpen(false) }}>
                                <strong>Home</strong>

                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={activeMenu === "about" ? " nav-link active" : "nav-link"} href="#about" onClick={() => { setActiveMenu("about"); setIsOpen(false) }}>
                                <strong>
                                    About
                                </strong>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className={activeMenu === "services" ? " nav-link active" : "nav-link"} href="#services" onClick={() => { setActiveMenu("services"); setIsOpen(false) }}>
                            <strong>Services </strong> 
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link href="#portfolio" className={activeMenu === "portfolio" ? " nav-link active" : "nav-link"} onClick={() => { setActiveMenu("portfolio"); setIsOpen(false) }}>
                            <strong>Portfolio</strong> 
                            </Link>
                        </li>




                    </ul>

                    {/* CTA Button */}
                    <Link
                        href="#contact"
                        className="btn btn-sm nav-btn text-primary mb-4 mb-lg-0"
                    >
                        Contact Us!

                    </Link>
                </div>
            </div>
        </nav>

    );
}