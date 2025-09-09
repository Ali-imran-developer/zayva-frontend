import { useState } from "react";
import { calculateDiscount } from "@/helper-functions/use-discount";

function ProductImageGallery({ productDetails }) {
  const discount = calculateDiscount(productDetails?.price, productDetails?.salePrice);
  const [selectedImage, setSelectedImage] = useState(productDetails?.images[0] ?? "/product-placeholder.jpg")

  return (
    <div className="w-full">
      <div className="relative overflow-hidden">
        <img src={selectedImage} alt={productDetails?.title}
          className="w-full h-auto max-h-[400px] object-cover rounded-none transition-all duration-500 ease-in-out"
        />

        {discount && (
          <div className="rounded-full flex flex-col items-center justify-center absolute top-2 left-2 bg-gray-800 w-16 h-16 text-base text-white font-semibold z-20">
            {discount}%
            <span>OFF</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 gap-2 mt-4">
        {productDetails?.images?.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className={`border rounded-lg overflow-hidden aspect-square flex items-center justify-center ${
              selectedImage === img ? "border-black" : "border-gray-300"
            }`}
          >
            <img
              src={img}
              alt={`Thumbnail ${index}`}
              className="w-full h-full object-cover hover:opacity-80 transition"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProductImageGallery;