import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useAuth } from "../../provider/AuthContext";

interface RegisterFormInputs {
  nit: string;
  nombre: string;
  telefono: string;
  password: string;
  correo: string;
  confirmPassword: string;
}

const RegisterForm: React.FC = () => {
  const { registerClient, error, nit, setNit } = useAuth(); // Accede a nit y setNit desde el contexto
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue, // Utiliza setValue para establecer valores por defecto
  } = useForm<RegisterFormInputs>();

  const password = watch("password"); // Watch password field to validate confirmPassword

  // Establece el valor por defecto de nit al cargar el componente
  useEffect(() => {
    if (nit) {
      setValue("nit", nit);
    }
  }, [nit, setValue]);

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    setNit(data.nit); // Actualiza el nit en el contexto
    await registerClient(data);
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
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
          htmlFor="nombre"
          className="block text-sm font-medium text-gray-700"
        >
          Business Name
        </label>
        <InputText
          id="nombre"
          {...register("nombre", {
            required: "Business Name is required",
          })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.nombre && (
          <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="telefono"
          className="block text-sm font-medium text-gray-700"
        >
          Phone
        </label>
        <InputText
          id="telefono"
          {...register("telefono", { required: "Phone is required" })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.telefono && (
          <p className="text-red-500 text-xs mt-1">{errors.telefono.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="correo"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <InputText
          id="correo"
          {...register("correo", { required: "Email is required" })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.correo && (
          <p className="text-red-500 text-xs mt-1">{errors.correo.message}</p>
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
