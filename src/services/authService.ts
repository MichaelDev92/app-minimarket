/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import Cookies from "js-cookie";

interface RegisterFormInputs {
  nit: string;
  nombre: string;
  telefono: string;
  correo: string;
  password: string;
}

const API_URL = "https://back-app-minimarket.onrender.com/api";

export const registerClient = async (data: RegisterFormInputs) => {
  try {
    const response = await axios.post(`${API_URL}/clients`, {
      nit: data.nit,
      nombre: data.nombre,
      correo: data.correo,
      password: data.password,
      telefono: data.telefono,
      estado: 1,
    });
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "An error occurred during registration");
  }
};

export const login = async (nit: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth`, { nit, password });
    if (response.data.token) {
      Cookies.set("token", response.data.token, { expires: 7 });
      Cookies.set("refreshToken", response.data.refreshToken, { expires: 7 });
      return response.data;
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "An error occurred during login");
  }
};

export const checkNitExists = async (nit: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/getNit`, { nit });
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "An error occurred during NIT check");
  }
};

export const logout = async () => {
  try {
    const token = Cookies.get("token");
    const refreshToken = Cookies.get("refreshToken");

    await axios.post(
      `${API_URL}/auth/logout`,
      {},
      {
        headers: {
          "authorization": `Bearer ${token}`,
          "refresh-token": refreshToken,
        },
      }
    );

    Cookies.remove("token");
    Cookies.remove("refreshToken");
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "An error occurred during logout");
  }
};