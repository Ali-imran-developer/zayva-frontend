import { ensureArray } from "@/helper-functions/use-formater";
import React, { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";

const BANNERS_CACHE_KEY = "bannerCache";
const Banners = ({ featureImageList }) => {
  const canvasRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const cached = localStorage.getItem(BANNERS_CACHE_KEY);
    if (cached) {
      try {
        setBanners(JSON.parse(cached));
        setLoading(false);
      } catch {
        setBanners(featureImageList);
      }
    } else {
      setBanners(featureImageList);
    }
  }, [featureImageList]);

  useEffect(() => {
    Promise.all(
      featureImageList.map(
        (src) =>
          new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve(src);
            img.onerror = () => resolve(null);
          })
      )
    ).then((loaded) => {
      const validImages = loaded.filter(Boolean);
      if (validImages.length) {
        setBanners(validImages);
        localStorage.setItem(BANNERS_CACHE_KEY, JSON.stringify(validImages));
        setLoading(false);
      }
    });
  }, [featureImageList]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [banners]);

  useEffect(() => {
    const hasPartied = localStorage.getItem("partyboom");
    if (!hasPartied && canvasRef.current) {
      const myConfetti = confetti.create(canvasRef.current, {
        resize: true,
        useWorker: true,
      });
      myConfetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.6 },
      });
      localStorage.setItem("partyboom", "true");
    }
  }, []);

  return (
    <div className="relative w-full h-[490px] overflow-hidden">
      {loading && (<div className="absolute top-0 left-0 w-full h-full bg-gray-200 animate-pulse rounded-lg" />)}
      {ensureArray(banners)?.map((slide, index) => (
        <img src={slide} key={index} alt="Banner"
          className={`${index === currentSlide ? "opacity-100" : "opacity-0"} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
        />
      ))}

      <div className="absolute top-0 left-0 w-full h-full bg-black/40" />

      <div className="absolute inset-0 flex flex-col gap-5 mx-12 items-start justify-center text-white drop-shadow-lg">
        <p className="text-lg md:text-xl font-semibold">Flat 50% Off</p>
        <h1 className="text-3xl md:text-5xl font-bold">Summer Special</h1>
      </div>

      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" />
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {ensureArray(banners)?.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-black scale-125 shadow-md"
                : "bg-gray-400/70 hover:bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banners;