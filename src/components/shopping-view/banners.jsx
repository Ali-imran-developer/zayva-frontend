import { ensureArray } from "@/helper-functions/use-formater";
import React, { useEffect, useState } from "react";

const Banners = ({ featureImageList }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
      }, 4000);
  
      return () => clearInterval(timer);
    }, [featureImageList]);

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      {ensureArray(featureImageList) && ensureArray(featureImageList)?.length > 0
        ? ensureArray(featureImageList)?.map((slide, index) => (
            <img
              src={slide}
              key={index}
              alt="Banner"
              className={`${
                index === currentSlide ? "opacity-100" : "opacity-0"
              } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
            />
          ))
        : null}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {ensureArray(featureImageList)?.map((_, index) => (
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
