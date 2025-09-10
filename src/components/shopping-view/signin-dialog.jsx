import { useFormik } from "formik";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RegisterSchema } from "@/validators/auth-schema";
import Loading from "../ui/loader";
import { useAuth } from "@/hooks/useAuth";

export default function SignInDialog({ open, onOpenChange }) {
  const initialSignupValues = { userName: "", email: "", password: "" };
  const { handlePrimarySignUp, isLoading } = useAuth();

  const formik = useFormik({
    initialValues: initialSignupValues,
    validationSchema: RegisterSchema,
    onSubmit: async (values, { resetForm }) => {
      try{
        console.log(values);
        const response = await handlePrimarySignUp(values);
        if (response?.success) {
          resetForm();
          onOpenChange(false);
        }
      }catch(error){
        console.log(error);
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-4 mt-4">
          {/* Username */}
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="userName"
              name="userName"
              value={formik.values.userName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`${formik.touched.userName && formik.errors.userName ? "border border-red-600" : ""}`}
            />
            {formik.touched.userName && formik.errors.userName && (
              <p className="text-sm text-red-500">{formik.errors.userName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`${formik.touched.email && formik.errors.email ? "border border-red-600" : ""}`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-500">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`${formik.touched.password && formik.errors.password ? "border border-red-600" : ""}`}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-500">{formik.errors.password}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            {isLoading ? <Loading /> : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
