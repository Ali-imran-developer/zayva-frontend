import { MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import StarRatingComponent from "../common/star-rating";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import Loading from "../ui/loader";
import { Input } from "../ui/input";

const ReviewForm = ({ reviewMsg, setReviewMsg, rating, setRating, handleAddReviews, isAddingReview, setShowReviewForm }) => {

  return (
    <Card className="border-2 border-dashed border-gray-200 bg-gray-50/50">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Write Your Review
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex gap-1">
            <StarRatingComponent
              rating={rating}
              handleRatingChange={setRating}
            />
          </div>
          <Input
            name="reviewMsg"
            value={reviewMsg}
            onChange={(event) => setReviewMsg(event.target.value)}
            placeholder="Share your thoughts about this product..."
            className="min-h-[40px]"
          />
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleAddReviews}
            disabled={reviewMsg?.trim() === "" || rating === 0}
            className="flex-1"
          >
            {isAddingReview ? <Loading /> : "Submit Review"}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setShowReviewForm(false);
              setRating(0);
              setReviewMsg("");
            }}
          >
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;