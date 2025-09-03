import { useEffect, useState } from "react";
import EyeIcon from "../icons/eye";

const LiveViewers = () => {
  const numbers = [283, 100, 59, 11, 14, 185, 193, 165, 50, 38, 99, 112, 46, 10, 125, 200, 250, 18];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % numbers.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [numbers.length]);

  return (
    <div className="text-sm font-medium text-gray-900 mt-2 flex items-center gap-3 py-4">
      <EyeIcon />
      {numbers[index]} customers are viewing this product
    </div>
  );
}

export default LiveViewers;