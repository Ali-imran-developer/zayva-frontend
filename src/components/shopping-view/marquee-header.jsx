import React from "react";

const MarqueeHeader = () => {

  return (
    <div className="w-full bg-black text-white overflow-hidden py-2">
      <div className="relative w-full">
        <div className="animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
          <span className="mx-8">
            Free Shipping on Orders Over 5000!
          </span>
          <span className="mx-8">
            Big Sale – Up to 70% Off!
          </span>
          <span className="mx-8">
            Secure Payments | 24/7 Support
          </span>
        </div>
      </div>
    </div>
  );
};

export default MarqueeHeader;