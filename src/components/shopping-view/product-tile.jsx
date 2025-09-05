import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { EyeIcon, HeartIcon, Loader } from "lucide-react";
import { formatPrice, newProduct } from "@/helper-functions/use-formater";
import Loading from "../ui/loader";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

function ShoppingProductTile({
  item,
  product,
  handleGetProductDetails,
  handleAddtoCart,
  isLoading,
}) {
  const isToday = newProduct(product);

  return (
    <Card key={item} className="w-full shadow-none max-w-sm mx-auto border-none group">
      <div className="relative overflow-hidden">
        <img
          src={product?.images?.[0] ?? "/product-placeholder.jpg"}
          alt="product-image"
          className="w-full h-[300px] object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
        />
        {product?.images?.[1] && (
          <img
            src={product?.images?.[1]}
            alt="product-image-hover"
            className="w-full h-[300px] object-cover absolute inset-0 opacity-0 transition-opacity duration-700 ease-in-out delay-150 group-hover:opacity-100"
          />
        )}

        {product?.totalStock === 0 ? (
          <Badge className="absolute top-8 left-0 rounded-none bg-black px-2 text-gray-200">
            Out Of Stock
          </Badge>
        ) : product?.totalStock < 10 ? (
          <Badge className="absolute top-8 left-0 rounded-none bg-black px-2 text-gray-200">
            {`Only ${product?.totalStock} items left`}
          </Badge>
        ) : product?.salePrice > 0 ? (
          <Badge className="absolute top-8 left-0 rounded-none bg-black px-2 text-gray-200">
            Sale
          </Badge>
        ) : null}
        {isToday && (
          <span className="absolute top-0 left-0 bg-white text-xs font-medium text-gray-800 px-2 py-1">
            New
          </span>
        )}

      <div className="absolute inset-0 flex flex-col justify-between">
        <div className="absolute right-3 top-1/4 -translate-y-1/2 flex flex-col gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  className="bg-white text-black hover:bg-black hover:text-white rounded-full shadow-lg 
                    transform translate-x-10 opacity-0 
                    group-hover:translate-x-0 group-hover:opacity-100 
                    transition-all duration-700 ease-in-out delay-150"
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
                  onClick={() => handleGetProductDetails(product?._id)}
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

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full">
          <Button onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="bg-white text-black border border-black w-full rounded-none shadow-lg hover:bg-black hover:text-white transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-in-out delay-150">
            {isLoading ? <Loading /> : "ADD TO CART"}
          </Button>
        </div>
      </div>

      </div>

      <CardContent className="p-2">
        <h2 className="text-sm text-gray-800 text-center font-[sans-serif] line-clamp-2 font-semibold mb-3">
          {product?.title}
        </h2>

        <div className="flex justify-center gap-5 items-center mb-2">
          <span
            className={`${
              product?.salePrice > 0 ? "line-through" : ""
            } text-sm font-bold text-gray-600`}
          >
            Rs.{formatPrice(product?.price) ?? 0}
          </span>
          {product?.salePrice > 0 && (
            <span className="text-sm font-bold text-[#becc13]">
              Rs.{formatPrice(product?.salePrice) ?? 0}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default ShoppingProductTile;