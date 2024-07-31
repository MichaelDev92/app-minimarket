import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

interface RegisterFormInputs {
  nit: string;
  businessName: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormInputs>();

  const password = watch("password"); // Watch password field to validate confirmPassword

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    // Handle registration
    console.log("Registration Data:", data);
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="nit"
          className="block text-sm font-medium text-gray-700"
        >
          NIT
        </label>
        <InputText
          id="nit"
          type="text"
          onInput={handleInput}
          {...register("nit", {
            required: "NIT is required",
            pattern: {
              value: /^[0-9]*$/,
              message: "NIT must be numeric",
            },
          })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.nit && (
          <p className="text-red-500 text-xs mt-1">{errors.nit.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="businessName"
          className="block text-sm font-medium text-gray-700"
        >
          Business Name
        </label>
        <InputText
          id="businessName"
          {...register("businessName", {
            required: "Business Name is required",
          })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.businessName && (
          <p className="text-red-500 text-xs mt-1">
            {errors.businessName.message}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Phone
        </label>
        <InputText
          id="phone"
          {...register("phone", { required: "Phone is required" })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <InputText
          id="password"
          type="password"
          {...register("password", { required: "Password is required" })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm Password
        </label>
        <InputText
          id="confirmPassword"
          type="password"
          {...register("confirmPassword", {
            required: "Confirm Password is required",
            validate: (value) => value === password || "Passwords do not match",
          })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <Button
        label="Register"
        type="submit"
        className="w-full hover:bg-blue-300 h-10 bg-blue-200"
      />
    </form>
  );
};

export default RegisterForm;
