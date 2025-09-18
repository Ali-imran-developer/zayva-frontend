import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { EyeIcon, HeartIcon } from "lucide-react";
import { formatPrice } from "@/helper-functions/use-formater";
import Loading from "../ui/loader";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { calculateDiscount } from "@/helper-functions/use-discount";
import { Link } from "react-router-dom";
import { useState } from "react";

function ShoppingProductTile({
  item,
  product,
  handleGetProductDetails,
  handleAddtoCart,
  isLoading,
}) {
  const [imageLoading, setImageLoading] = useState(true);
  const [hoverImageLoading, setHoverImageLoading] = useState(true);
  const discount = calculateDiscount(product?.price, product?.salePrice);
  return (
    <Card key={item} className="w-full shadow-none max-w-sm mx-auto border-none group">
      <div className="relative overflow-hidden">
        <Link to={`/shop/listing/${product?._id}`} className="block">
          {imageLoading && (
            <div className="w-full h-[300px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md"></div>
          )}
          
          <img
            src={product?.images?.[0] ?? "/product-placeholder.jpg"}
            alt="product-image"
            className={`w-full h-[200px] sm:h-[300px] md:h-[300px] lg:h-[300px] object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0 cursor-pointer ${
              imageLoading ? 'opacity-0 absolute inset-0' : 'opacity-100'
            }`}
            onLoad={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
          />

          {product?.images?.[1] ? (
            <>
              {hoverImageLoading && imageLoading && (
                <div className="w-full h-[300px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out delay-150 rounded-md"></div>
              )}
              <img
                src={product?.images?.[1]}
                alt="product-image-hover"
                className={`w-full h-[200px] sm:h-[300px] md:h-[300px] lg:h-[300px] object-cover absolute inset-0 transition-opacity duration-700 ease-in-out delay-150 group-hover:opacity-100 ${
                  hoverImageLoading || imageLoading ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
                }`}
                onLoad={() => setHoverImageLoading(false)}
                onError={() => setHoverImageLoading(false)}
              />
            </>
          ) : (
            <img
              src={product?.images?.[0]}
              alt="product-image-hover"
              className={`w-full h-[200px] sm:h-[300px] md:h-[300px] lg:h-[300px] object-cover absolute inset-0 transition-opacity duration-700 ease-in-out delay-150 ${
                imageLoading ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
              }`}
            />
          )}
        </Link>

        {discount && (
          <div className="rounded-full flex items-center justify-center gap-1 text-sm absolute top-2 left-2 bg-green-600 w-[70px] h-8 text-white font-semibold z-20">
            {discount}%
            <span>OFF</span>
          </div>
        )}

        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-10">
          <div className="absolute right-3 top-1/4 -translate-y-1/2 flex flex-col gap-3 pointer-events-auto">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    className="bg-white text-black hover:bg-black hover:text-white rounded-full shadow-lg 
                      transform translate-x-10 opacity-0 
                      group-hover:translate-x-0 group-hover:opacity-100 
                      transition-all duration-700 ease-in-out delay-150"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log("Add to Wishlist");
                    }}
                  >
                    <HeartIcon className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="left"
                  className="bg-white font-semibold text-black px-2 py-1 rounded shadow-md"
                >
                  Add to Wishlist
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    className="bg-white text-black hover:bg-black hover:text-white rounded-full shadow-lg 
                      transform translate-x-10 opacity-0 
                      group-hover:translate-x-0 group-hover:opacity-100 
                      transition-all duration-700 ease-in-out delay-200"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleGetProductDetails(product?._id);
                    }}
                  >
                    <EyeIcon className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="left"
                  className="bg-white text-black font-semibold px-2 py-1 rounded shadow-md"
                >
                  Quick View
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="absolute bottom-0 w-full pointer-events-auto">
            <Button onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddtoCart(product._id, 1);}} className="bg-black text-white border border-black w-full rounded-none shadow-lg">
              {isLoading ? <Loading /> : "ADD TO CART"}
            </Button>
          </div>
        </div>
      </div>

      <CardContent className="p-2">
        <Link to={`/shop/listing/${product?._id}`} className="cursor-pointer">
          <h2 className="text-sm text-gray-800 hover:text-black text-center font-[sans-serif] line-clamp-2 font-semibold mb-3">
            {product?.title}
          </h2>
        </Link>

        <div className="flex justify-center gap-5 items-center mb-2">
          <span className={`${product?.salePrice > 0 ? "line-through" : ""} text-sm font-bold text-gray-600`}>
            Rs.{formatPrice(product?.price) ?? 0}
          </span>
          {product?.salePrice > 0 && (
            <span className="text-sm font-bold text-green-600">
              Rs.{formatPrice(product?.salePrice) ?? 0}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default ShoppingProductTile;