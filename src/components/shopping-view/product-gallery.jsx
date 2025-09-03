import { useState } from "react"
import { Badge } from "../ui/badge"

function ProductImageGallery({ productDetails, isToday }) {
  const [selectedImage, setSelectedImage] = useState(productDetails?.images[0] ?? "/product-placeholder.jpg")

  return (
    <div>
      <div className="relative overflow-hidden">
        <img src={selectedImage} alt={productDetails?.title}
          className="aspect-square w-[700px] h-[400px] object-cover rounded-lg transition-all duration-500 ease-in-out"
        />

        {productDetails?.totalStock === 0 ? (
          <Badge className="absolute top-8 left-0 rounded-none bg-black px-2 text-gray-200 hover:bg-red-600">
            Out Of Stock
          </Badge>
        ) : productDetails?.totalStock < 10 ? (
          <Badge className="absolute top-8 left-0 rounded-none bg-black px-2 text-gray-200 hover:bg-red-600">
            {`Only ${productDetails?.totalStock} items left`}
          </Badge>
        ) : productDetails?.salePrice > 0 ? (
          <Badge className="absolute top-8 left-0 rounded-none bg-black px-2 text-gray-200 hover:bg-red-600">
            Sale
          </Badge>
        ) : null}
        {isToday && (
          <span className="absolute top-0 left-0 bg-white text-xs font-medium text-gray-800 px-2 py-1">
            New
          </span>
        )}
      </div>

      <div className="grid grid-cols-4 gap-2 mt-4">
        {productDetails?.images?.map((img, index) => (
          <button key={index} onClick={() => setSelectedImage(img)} className={`border rounded-lg overflow-hidden ${selectedImage === img ? "border-black" : "border-gray-300"}`}>
            <img src={img} alt={`Thumbnail ${index}`}
              className="w-full h-24 object-cover hover:opacity-80 transition"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProductImageGallery;