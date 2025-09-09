import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({ rating, handleRatingChange, className }) {

  return [1, 2, 3, 4, 5].map((star) => (
    <Button  variant="outline" size="icon" onClick={handleRatingChange ? () => handleRatingChange(star) : null}
      className={`w-6 h-6 rounded-full transition-colors ${className} ${star <= rating ? "text-yellow-500 hover:bg-yellow-500" : "text-black hover:bg-primary hover:text-white"}`}>
      <StarIcon className={`w-4 h-4 hover:text-white ${star <= rating ? "fill-yellow-500" : "fill-black"}`} />
    </Button>
  ));
}

export default StarRatingComponent;
