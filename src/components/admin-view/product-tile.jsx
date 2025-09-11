import { formatPrice } from "@/helper-functions/use-formater";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { PencilIcon, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { calculateDiscount } from "@/helper-functions/use-discount";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  const discount = calculateDiscount(product?.price, product?.salePrice);
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative overflow-hidden">
          <img
            src={product?.images?.[0] ?? "/product-placeholder.jpg"}
            alt="product-image"
            className="w-full h-[250px] object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
          />
          {product?.images?.[1] && (
            <img
              src={product?.images?.[1]}
              alt="product-image-hover"
              className="w-full h-[300px] object-cover absolute inset-0 opacity-0 transition-opacity duration-700 ease-in-out delay-150 group-hover:opacity-100"
            />
          )}

          {discount && (
            <div className="rounded-full absolute top-2 left-2 bg-black p-2 w-11 h-auto text-base text-white font-semibold">
              {discount}%
            </div>
          )}

          <Button className="absolute top-0 right-0 cursor-pointer rounded-none bg-black px-2 py-1" onClick={() => {
            setOpenCreateProductsDialog(true);
            setCurrentEditedId(product?._id);
            setFormData(product);
          }}>
            <PencilIcon className="w-4 h-4 cursor-pointer hover:cursor-pointer" />
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="absolute bottom-0 right-0 cursor-pointer rounded-none bg-black px-2 py-1">
                <X className="w-5 h-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete {product?.title}.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete(product?._id)}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <CardContent>
          <h2 className="text-sm text-gray-800 text-center font-[sans-serif] line-clamp-2 font-semibold my-3">
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
        {/* <CardFooter className="flex justify-between items-center">
        </CardFooter> */}
      </div>
    </Card>
  );
}

export default AdminProductTile;
