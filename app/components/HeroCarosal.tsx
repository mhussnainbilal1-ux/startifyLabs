"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCreative } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-creative";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { useEffect, useState } from "react";

const banners = [
  "/images/personal/banner.png",
  "/images/personal/banner2.png",
];

export default function HeroCarosal() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  return (
    <div
    style={{
      backgroundColor: "#f5f6f8",
      marginLeft: isMobile ? "0" : "100px",
      marginRight: isMobile ? "0" : "100px",
    }}
    >
     <Swiper
  modules={[Autoplay, Pagination, EffectCreative]}
  effect="creative"
  creativeEffect={{
    prev: {
      translate: ["-20%", 0, -1],
      opacity: 0,
    },
    next: {
      translate: ["100%", 0, 0],
    },
  }}
  speed={1000}
  loop
  autoplay={{
    delay: 5000,
    disableOnInteraction: false,
  }}
  pagination={{ clickable: true }}
>
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                width: "100%",
                maxWidth: "1400px",
                margin: "0 auto",
               
               // padding: "0 16px",
               // boxSizing: "border-box",
              }}
            >
              <img
                src={banner}
                alt={`Startify Labs Banner ${index + 1}`}
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
              marginTop:"90px"
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}