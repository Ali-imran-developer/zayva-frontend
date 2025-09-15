import ProductFilter from "@/components/shopping-view/filter";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import ShoppingProductSkeleton from "@/components/shopping-view/products-skeleton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Loading from "@/components/ui/loader";
import { useToast } from "@/components/ui/use-toast";
import { sortOptions } from "@/config";
import AuthController from "@/controllers/authController";
import { getGuestId } from "@/helper-functions/use-auth";
import { ensureArray } from "@/helper-functions/use-formater";
import createSearchParamsHelper from "@/helper-functions/use-paramHelper";
import { useCart } from "@/hooks/useCart";
import { useProducts } from "@/hooks/useProducts";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function ShoppingListing() {
  const dispatch = useDispatch();
  const { isLoadingProducts, handleGetProducts, handleGetProductsDetail } = useProducts();
  const { handleAddToCart, handleGetCarts } = useCart();
  const { productList, productDetails } = useSelector((state) => state.Products);
  const session = AuthController.getSession();
  const user = session?.user;
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const categorySearchParam = searchParams.get("category");

  function handleSort(value) {
    setSort(value);
  }

  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  const handleGetProductDetails = async (getCurrentProductId) => {
    try{
      const response = await handleGetProductsDetail(getCurrentProductId);
      if(response?.success && productDetails !== null){
        setOpenDetailsDialog(true);
      }
    }catch(error){
      console.log(error);
    }
  }

  const handleAddtoCartFunc = async (getCurrentProductId, quantity) => {
    try {
      setIsLoading(true);
      const userId = user?.id;
      const guestId = !userId ? getGuestId() : null;
      const data = await handleAddToCart({ userId: userId, guestId: guestId, productId: getCurrentProductId, quantity });
      if (data?.success) {
        if (userId) {
          await handleGetCarts({ userId });
        } else {
          await handleGetCarts({ guestId });
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});

  }, [categorySearchParam]);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  useEffect(() => {
    if (filters !== null && sort !== null) {
      handleGetProducts({ filterParams: filters, sortParams: sort });
    }
  }, [sort, filters]);

  // useEffect(() => {
  //   if (productDetails !== null) setOpenDetailsDialog(true);

  // }, [productDetails]);

  const renderContent = () => {
    if (isLoadingProducts) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <ShoppingProductSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (!ensureArray(productList)?.length) {
      return (
        <div className="flex items-center justify-center h-64 w-full text-gray-500 font-semibold text-lg">
          No products exist
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {ensureArray(productList)?.map((productItem, index) => (
          <ShoppingProductTile
            key={productItem?.id || index}
            item={index}
            handleGetProductDetails={handleGetProductDetails}
            product={productItem}
            handleAddtoCart={handleAddtoCartFunc}
            isLoading={isLoading}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productList?.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {ensureArray(sortOptions)?.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="container mx-auto px-4">
          {renderContent()}
        </div>
      </div>
      {openDetailsDialog && (
        <ProductDetailsDialog
          open={openDetailsDialog}
          setOpen={setOpenDetailsDialog}
          productDetails={productDetails}
        />
      )}
    </div>
  );
}

export default ShoppingListing;