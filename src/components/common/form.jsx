import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import Loading from "../ui/loader";
import { useBrands } from "@/hooks/useBrands";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ensureArray } from "@/helper-functions/use-formater";

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isLoading,
  isBtnDisabled,
}) {
  const { isLoading: isBrandsLoading, handleGetBrands } = useBrands();
  const { brandsList } = useSelector((state) => state.Brands);

  useEffect(() => {
    const hasBrandSelect = formControls.some(
      (control) =>
        control.componentType === "select" && control.name === "brand"
    );
    if (hasBrandSelect) {
      handleGetBrands();
    }
  }, []);

  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name] || "";

    const options = getControlItem?.componentType === "select" && getControlItem?.name === "brand"
      ? ensureArray(brandsList)?.map((item) => ({
        id: item?.id,
        label: item?.label,
    })) : getControlItem?.options || [];

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );

        break;
      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {ensureArray(options)?.length > 0 ? (ensureArray(options)?.map((optionItem) => (
                <SelectItem key={optionItem?.id} value={optionItem?.id}>
                  {optionItem?.label}
                </SelectItem>
                ))
              ) : (
                <SelectItem disabled value="no-options">
                  {isBrandsLoading && getControlItem.name === "brand" ? "Loading brands..." : "No options"}
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        );

        break;
      case "textarea":
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );

        break;

      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="mb-1">{controlItem.label}</Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button disabled={isBtnDisabled} type="submit" className="mt-4 w-full">
        {isLoading ? <Loading /> : buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;