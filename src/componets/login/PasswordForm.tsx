import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useAuth } from "../../provider/AuthContext";

interface PasswordFormInputs {
  password: string;
}

const PasswordForm: React.FC = () => {
  const { login, nit, redirectToHome } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormInputs>();

  const onSubmit: SubmitHandler<PasswordFormInputs> = async (data) => {
    if (nit) {
      // Ensure nit is available before calling login
      const success = await login(nit, data.password); // Suponiendo que tu función de login existe y retorna un booleano o algo similar

      if (success) {
        redirectToHome(); // Redirige a la página de inicio después de un inicio de sesión exitoso
      } else {
        // Manejo de errores
        alert("Login failed, please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
      <Button
        label="Login"
        type="submit"
        className="w-full hover:bg-blue-300 h-10 bg-blue-200"
      />
    </form>
  );
};

export default PasswordForm;
