import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

interface EmailFormInputs {
  nit: string;
}

interface EmailFormProps {
  onSuccess: (nit: string) => void;
  initialNit?: string | null;
}

const EmailForm: React.FC<EmailFormProps> = ({ onSuccess, initialNit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EmailFormInputs>({
    defaultValues: {
      nit: initialNit || "",
    },
  });

  const onSubmit: SubmitHandler<EmailFormInputs> = (data) => {
    onSuccess(data.nit);
  };

  React.useEffect(() => {
    if (initialNit) {
      setValue("nit", initialNit);
    }
  }, [initialNit, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          NIT de la empresa
        </label>
        <InputText
          id="email"
          {...register("nit", { required: "Email is required" })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.nit && (
          <p className="text-red-500 text-xs mt-1">{errors.nit.message}</p>
        )}
      </div>
      <div className="flex justify-center">
        <Button
          label="Iniciar sesión"
          type="submit"
          className="w-full hover:bg-blue-300 h-10 bg-blue-200"
        />
      </div>
    </form>
  );
};

export default EmailForm;
