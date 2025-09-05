import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const { isLoading, handlePrimarySignUp } = useAuth();

  function onSubmit(event) {
    event.preventDefault();
    handlePrimarySignUp(formData);
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6 mt-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}

export default AuthRegister;
