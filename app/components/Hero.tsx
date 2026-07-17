"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import HeroCarosal from "./HeroCarosal";

export default function Hero() {
  const typedRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // load typed.js dynamically (since it's a template dependency)
    const initTyped = async () => {
      const Typed = (await import("typed.js")).default;

      if (typedRef.current) {
        new Typed(typedRef.current, {
          strings: [ "the UK", "Europe" ," the Middle East"],
          typeSpeed: 80,
          backSpeed: 50,
          loop: true,
          backDelay: 2000,
        });
      }
    };

    initTyped();
  }, []);

  return (
    <section
      id="home"
      className="hero-one position-relative main-bg"
      style={{
        backgroundImage: "url(/images/personal/main-bg.png)",
        backgroundColor:"#f5f6f8",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
       <HeroCarosal/>
      <div className="container">
        <div className="row align-items-center justify-content-center">
          
          <div className="col-lg-12 text-center px-0 px-xl-4 mt-5 mt-lg-0 pt-5 pt-lg-0 mb-5">
           

            <h2 className="hero-title mb-4 font-secondary" style={{
              fontFamily: "'Space Grotesk', sans-serif !important",
              fontSize: "clamp(32px, 5vw, 54px)",
              lineHeight: "1.3",
              fontWeight: 400,
              color: "#172d51",
            }} >
            Your Trusted White-Label Software Development Partner Across {"     "}
              <mark>
                <span ref={typedRef} className="fw-medium"></span>
              </mark>{" "}
             
            </h2>

            <div className="mb-5 mb-lg-0">
              <a className="btn btn-primary"
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/company-profile/Startify-Labs-Company-Profile.pdf";
                link.download = "Startify-Labs-Company-Profile.pdf";
                link.click();
              }}
              >
                Download Profile
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
