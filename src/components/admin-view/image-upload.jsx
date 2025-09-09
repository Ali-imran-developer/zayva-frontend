import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
import { ensureArray } from "@/helper-functions/use-formater";
import { useLocation } from "react-router-dom";
const PORT = import.meta.env.VITE_PORT;

function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);
  const location = useLocation();

  function handleImageFileChange(event) {
    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.length > 0) {
      setImageFile((prev) => [...(prev || []), ...selectedFiles]);
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    if (droppedFiles.length > 0) {
      setImageFile((prev) => [...(prev || []), ...droppedFiles]);
    }
  }

  function handleRemoveImage(index) {
    setImageFile((prev) => prev.filter((_, i) => i !== index));
    if (inputRef.current && imageFile.length === 1) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    imageFile.forEach((file) => { data.append("my_file", file) });
    const response = await axios.post(`${PORT}/api/admin/products/upload-image`, data);
    if (response?.data?.success) {
      setUploadedImageUrl(response.data.images);
    }
    setImageLoadingState(false);
  }

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      uploadImageToCloudinary();
    }
  }, [imageFile]);

  return (
    <div className={`w-full mt-6 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <Label className="text-base font-semibold mb-2 block">
        {location?.pathname === "/admin/products" ? "Upload Product Images" : "Upload Banner Images"}
      </Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${
          isEditMode ? "opacity-60" : ""
        } border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
          multiple
        />
        {!imageFile || imageFile.length === 0 ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : ""
            } flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload images</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="space-y-2">
            {ensureArray(imageFile)?.map((file, index) => (
              <div key={index} className="flex items-center justify-between border rounded-lg p-2">
                <div className="flex items-center">
                  <FileIcon className="w-6 text-primary mr-2 h-6" />
                  <p className="text-sm font-medium truncate max-w-[200px]">
                    {file?.name}
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={() => handleRemoveImage(index)}>
                  <XIcon className="w-4 h-4" />
                  <span className="sr-only">Remove File</span>
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;