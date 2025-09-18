import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { X } from "lucide-react";
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
  const { productList, totalProducts } = useSelector((state) => state.AdminProducts);
  const { isLoadingProducts, isAddingProducts, handleGetProducts, handleDeleteProducts, handleAddProducts, handleUpdateProducts } = useAdminProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 12;
  const totalPages = Math.ceil(totalProducts / limit);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const onSubmit = async (event) => {
    event.preventDefault();
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
    handleGetProducts({ search: debouncedSearch, page, limit });

  }, [debouncedSearch, page]);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-between">
        <div className="relative w-72 max-w-full">
          <Input
            className="w-full pr-10"
            placeholder="Search Products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <X
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-black"
              size={18}
              onClick={() => setSearchTerm("")}
            />
          )}
        </div>
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      {isLoadingProducts ? (
        <div className="flex justify-center items-center w-full h-64">
          <Loading className="bg-black" />
        </div>
      ) : (
        <>
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
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
              >
                Previous
              </Button>
              <span className="text-sm">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                disabled={page === totalPages}
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </>
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