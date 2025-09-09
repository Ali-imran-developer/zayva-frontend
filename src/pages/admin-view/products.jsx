import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loader";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { ensureArray } from "@/helper-functions/use-formater";
import { useAdminProducts } from "@/hooks/useAdminProducts";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const initialFormData = {
  images: [],
  title: "",
  description: "",
  category: "",
  productType: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: 0,
  averageReview: 0,
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState([]);
  const [uploadedImageUrl, setUploadedImageUrl] = useState([]);
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { productList } = useSelector((state) => state.AdminProducts);
  const { isLoadingProducts, isAddingProducts, handleGetProducts, handleDeleteProducts, handleAddProducts, handleUpdateProducts } = useAdminProducts();

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log("formData", formData);
    try {
      if (currentEditedId !== null) {
        const response = await handleUpdateProducts({ id: currentEditedId, formData });
        if (response?.success) {
          setFormData(initialFormData);
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
        }
      } else {
        const response = await handleAddProducts({ ...formData, images: uploadedImageUrl });
        if (response?.success) {
          setOpenCreateProductsDialog(false);
          setImageFile([]);
          setUploadedImageUrl([]);
          setFormData(initialFormData);
        }
      }
    } catch (error) {
      console.error("Error in onSubmit:", error);
      toast.error(error?.message);
    }
  };

  const handleDelete = async (getCurrentProductId) => {
    try {
      if (getCurrentProductId) {
        await handleDeleteProducts(getCurrentProductId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function isFormValid() {
    return Object.keys(formData).filter((currentKey) => currentKey !== "averageReview" && currentKey !== "totalStock").map((key) => formData[key] !== "").every((item) => item);
  }

  useEffect(() => {
    handleGetProducts();

  }, []);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      {isLoadingProducts ? (
        <div className="flex justify-center items-center w-full h-64">
          <Loading className="bg-black" />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {ensureArray(productList) && ensureArray(productList)?.length > 0 ? (
            ensureArray(productList)?.map((productItem) => (
              <AdminProductTile
                key={productItem?.id}
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No products found
            </div>
          )}
        </div>
      )}
      <Sheet open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
              isLoading={isAddingProducts}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;