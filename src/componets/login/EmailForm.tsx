import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

interface EmailFormInputs {
  email: string;
}

interface EmailFormProps {
  onSuccess: (email: string) => void;
  initialEmail?: string | null;
}

const EmailForm: React.FC<EmailFormProps> = ({ onSuccess, initialEmail }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EmailFormInputs>({
    defaultValues: {
      email: initialEmail || "",
    },
  });

  const onSubmit: SubmitHandler<EmailFormInputs> = (data) => {
    onSuccess(data.email);
  };

  React.useEffect(() => {
    if (initialEmail) {
      setValue("email", initialEmail);
    }
  }, [initialEmail, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <InputText
          id="email"
          {...register("email", { required: "Email is required" })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
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
