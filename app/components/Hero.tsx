"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Hero() {
  const typedRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // load typed.js dynamically (since it's a template dependency)
    const initTyped = async () => {
      const Typed = (await import("typed.js")).default;

      if (typedRef.current) {
        new Typed(typedRef.current, {
          strings: ["React", "Flutter", "Python"],
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
      // backgroundColor:"whitesmoke",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container">
        <div className="row align-items-center justify-content-center">
          
          {/* Image */}
          <div className="col-lg-5 mx-auto mt-5">
            <Image
              src="/images/personal/2.png"
              alt="hero"
              width={500}
              height={500}
              className="img-fluid"
            />
          </div>

          {/* Text */}
          <div className="col-lg-7 text-center px-0 px-xl-4 mt-5 mt-lg-0 pt-5 pt-lg-0">
            <h5 className="d-inline-block py-1 px-3 rounded text-muted font-secondary">
              Hi, I'm David Williamson
            </h5>

            <h1 className="hero-title mb-4 font-secondary">
              I'm a freelance{" "}
              <mark>
                <span ref={typedRef} className="fw-medium"></span>
              </mark>{" "}
              Developer
            </h1>

            <div className="mb-5 mb-lg-0">
              <a href="/cv.pdf" className="btn btn-primary">
                Download CV
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}