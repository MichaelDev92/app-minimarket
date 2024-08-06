import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const useAuthData = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = Cookies.get("token");
    const refreshToken = Cookies.get("refreshToken");

    if (token && refreshToken) {
      try {
        // Si los tokens existen, considera al usuario como autenticado
        // Podrías agregar lógica para verificar la validez de los tokens aquí si es necesario
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error processing authentication data", error);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  return { isAuthenticated, loading };
};

export default useAuthData;
