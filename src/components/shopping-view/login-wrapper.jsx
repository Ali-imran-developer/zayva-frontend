import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Input } from "../ui/input";
import { useFormik } from "formik";
import { LoginSchema } from "@/validators/auth-schema";
import { useAuth } from "@/hooks/useAuth";
import { Loader, Loader2 } from "lucide-react";

function LoginWrapper({ setLoginSheet }) {
  const navigate = useNavigate();
  const { handlePrimaryLogin, isLoading } = useAuth();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleClose = () => {
    setLoginSheet(false);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: LoginSchema,
    onSubmit: async (values, { resetForm }) => {
      try{
        console.log("Form Values:", values);
        const response = await handlePrimaryLogin(values);
        if (response?.success) {
          resetForm();
          handleClose();
        }
      }catch(error){
        console.log(error);
      }
    },
  });

  return (
    <SheetContent className="max-w-md h-full flex flex-col p-4">
      <SheetHeader>
        <SheetTitle className="text-lg w-full flex items-start">Login</SheetTitle>
      </SheetHeader>

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 mt-5 flex-1">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">Email Address *</p>
          <Input
            id="email"
            name="email"
            type="email"
            label="email"
            placeholder="Enter your email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={formik.touched.email && formik.errors.email ? "border border-red-600 hover:border-red-600 focus-visible:border-red-600" : ""}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">Password *</p>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className={formik.touched.password && formik.errors.password ? "border border-red-600 hover:border-red-600 focus-visible:border-red-600" : ""}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}
        </div>

        <div className="border-t pt-4 flex flex-col items-center gap-4">
          <Button type="submit" className="w-full uppercase rounded-none border border-black text-white bg-black  transition-colors duration-1000  hover:text-black hover:bg-white">
            {isLoading ? <Loader2 className="animate-spin" /> : "Log in"}
          </Button>
          <Button type="button" className="w-full uppercase rounded-none border border-black text-black bg-white  transition-colors duration-1000  hover:text-white hover:bg-black" variant="outline" onClick={() => navigate("/auth/register")}>
            Create Account
          </Button>
        </div>
      </form>
    </SheetContent>
  );
}

export default LoginWrapper;