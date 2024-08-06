import React from "react";
import { Divider } from "primereact/divider";
import RegisterForm from "../../componets/login/RegisterForm";
import PasswordForm from "../../componets/login/PasswordForm";
import EmailForm from "../../componets/login/EmailForm";
import imageLogin from "../../assets/png/login-market.png";
import { useAuth } from "../../provider/AuthContext";

const Login: React.FC = () => {
  const { formState, setFormState, nit, setNit, checkNitExists } = useAuth();

  const handleEmailSubmit = async (nit: string) => {
    setNit(nit);
    const exists = await checkNitExists(nit);

    if (exists) {
      setFormState("password");
    } else {
      setFormState("register");
    }
  };

  const handleGoBack = () => {
    setFormState("nit");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-blue-200 p-0">
      <div className="flex-1 flex items-center justify-center gap-3 py-5">
        <div className="w-full max-w-md p-8 shadow-md rounded-lg bg-gray-100">
          {formState === "register" && (
            <button
              onClick={handleGoBack}
              className="text-blue-500 mt-4 block hover:underline"
            >
              Back to Email Form
            </button>
          )}
          {formState === "password" && (
            <button
              onClick={handleGoBack}
              className="text-blue-500 mt-4 block hover:underline"
            >
              Back to Email Form
            </button>
          )}
          <h2
            className="text-2xl font-bold mb-6 flex justify-center"
            style={{ color: "#071952" }}
          >
            {formState === "nit" && "Iniciar sesión"}
            {formState === "register" && "Regístrate"}
          </h2>

          {formState === "nit" && (
            <EmailForm onSuccess={handleEmailSubmit} initialNit={nit} />
          )}
          {formState === "password" && (
            <>
              <h2 className="text-2xl font-bold mb-6">Ingresar contraseña</h2>
              <PasswordForm />
            </>
          )}
          {formState === "register" && (
            <>
              <RegisterForm />
            </>
          )}
        </div>
      </div>
      <div className="flex items-center border-solid border-2">
        <Divider layout="vertical" className="lg:hidden lg:block" />
      </div>

      <div className="hidden lg:flex flex-1 items-center">
        <div className="flex flex-col 2xl:ml-40 ml-10">
          <h2
            className="text-2xl font-bold mb-6 flex justify-center items-center"
            style={{ color: "#071952" }}
          >
            MiniMarket
          </h2>
          <img
            src={imageLogin}
            alt="Descripción de la imagen"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
