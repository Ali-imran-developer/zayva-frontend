import { Card, CardContent } from "../ui/card";

function ShoppingProductSkeleton() {
  return (
    <Card className="w-full shadow-none max-w-sm mx-auto border-none animate-pulse">
      <div className="relative w-full h-[300px] rounded-md overflow-hidden bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer">
        <div className="absolute bottom-0 left-0 w-full h-12 bg-gray-300"></div>
      </div>

      <CardContent className="p-2">
        <div className="h-4 w-3/4 mx-auto bg-gray-300 rounded mb-3"></div>
        <div className="h-4 w-1/2 mx-auto bg-gray-300 rounded mb-3"></div>
      </CardContent>
    </Card>
  );
}

export default ShoppingProductSkeleton;