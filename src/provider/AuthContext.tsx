/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState, ReactNode, useContext } from "react";
import * as authService from "../services/authService";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  registerClient: (data: RegisterFormInputs) => Promise<void>;
  login: (nit: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  error: string | null;
  userLoggin: boolean;
  setUserLoggin: (login: boolean) => void;
  formState: "nit" | "password" | "register" | null;
  setFormState: (state: "nit" | "password" | "register" | null) => void;
  nit: string | null;
  setNit: (nit: string | null) => void;
  checkNitExists: (nit: string) => Promise<boolean>;
  redirectToHome: () => void;
  redirectToLogin: () => void;
}

interface RegisterFormInputs {
  nit: string;
  nombre: string;
  telefono: string;
  password: string;
  confirmPassword: string;
  correo: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [formState, setFormState] = useState<
    "nit" | "password" | "register" | null
  >("nit");
  const [nit, setNit] = useState<string | null>(null);
  const [userLogin, setUserLogin] = useState<boolean>(false);
  const navigate = useNavigate();

  const registerClient = async (data: RegisterFormInputs) => {
    try {
      setError(null);
      await authService.registerClient({
        nit: data.nit,
        nombre: data.nombre,
        telefono: data.telefono,
        password: data.password,
        correo: data.correo,
      });
      setFormState("nit");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const login = async (nit: string, password: string): Promise<boolean> => {
    try {
      setError(null);
      await authService.login(nit, password);
      setUserLogin(true);
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUserLogin(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const checkNitExists = async (nit: string): Promise<boolean> => {
    try {
      return await authService.checkNitExists(nit);
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const redirectToHome = () => {
    navigate("/home");
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const redirectToLogin = () => {
    navigate("/login");
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <AuthContext.Provider
      value={{
        registerClient,
        login,
        logout,
        error,
        formState,
        setFormState,
        nit,
        userLoggin: userLogin,
        setUserLoggin: setUserLogin,
        setNit,
        checkNitExists,
        redirectToHome,
        redirectToLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
