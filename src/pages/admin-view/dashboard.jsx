import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loader";
import { ensureArray } from "@/helper-functions/use-formater";
import { useFeatures } from "@/hooks/useFeature";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import Swiper from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const { featureImageList } = useSelector((state) => state.Features);
  const { isAddingFeature, handleAddFeatures, handleGetFeatures, isGetFeature } = useFeatures();

  const handleUploadFeatureImage = async () => {
    try {
      const response = handleAddFeatures(uploadedImageUrl);
      if (response?.payload?.success) {
        setImageFile(null);
        setUploadedImageUrl("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetFeatures();

  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-2 lg:gap-4">
      <div className="">
        <ProductImageUpload
          imageFile={imageFile}
          setImageFile={setImageFile}
          uploadedImageUrl={uploadedImageUrl}
          setUploadedImageUrl={setUploadedImageUrl}
          setImageLoadingState={setImageLoadingState}
          imageLoadingState={imageLoadingState}
          isCustomStyling={true}
        />
        <Button onClick={handleUploadFeatureImage} className="mt-5 w-full" disabled={imageFile === null || imageLoadingState || isAddingFeature}>
          {imageLoadingState || isAddingFeature ? <Loading /> : "Upload"}
        </Button>
      </div>
      <div className="w-full">
        {isGetFeature ? (
          <div className="flex items-center justify-center h-[300px] border rounded-lg">
            <Loading className="bg-black" />
          </div>
        ) : ensureArray(featureImageList)?.length > 0 ? (
          <div className="relative w-full">
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".custom-next",
                prevEl: ".custom-prev",
              }}
              loop
              spaceBetween={10}
              slidesPerView={1}
              className="rounded-lg shadow-md"
            >
              {ensureArray(featureImageList)?.map((featureImgItem, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={featureImgItem ?? ""}
                    alt={`Feature ${index}`}
                    className="w-full h-[300px] object-cover rounded-lg"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <button className="custom-prev absolute top-1/2 -left-2 z-10 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>

            <button className="custom-next absolute top-1/2 -right-2 z-10 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[300px] text-gray-500 border rounded-lg">
            No feature images
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;