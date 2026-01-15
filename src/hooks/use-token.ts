import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

interface DecodedToken {
  first_name: string;
  last_name: string;
  company_id: number;
  company_description: string;
  ccosto_id: number;
  iat: number;
  exp: number;
}

export const useToken = () => {
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("authToken");
  });
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(() => {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");

    // Si hay token en la URL, usarlo y guardarlo
    if (tokenFromUrl) {
      try {
        const decoded = decodeJWT(tokenFromUrl);
        setToken(tokenFromUrl);
        setDecodedToken(decoded as DecodedToken);
        
        // Guardar en localStorage para persistencia
        localStorage.setItem("authToken", tokenFromUrl);
        localStorage.setItem("userData", JSON.stringify(decoded));
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al decodificar token");
        setToken(null);
        setDecodedToken(null);
      }
    } else {
      // Si no hay token en URL, intentar recuperar del localStorage
      const savedToken = localStorage.getItem("authToken");
      const savedUserData = localStorage.getItem("userData");
      
      if (savedToken && savedUserData) {
        setToken(savedToken);
        setDecodedToken(JSON.parse(savedUserData));
        setError(null);
      }
    }
    
    setIsLoading(false);
  }, [searchParams]);

  return { token, decodedToken, error, isLoading };
};

/**
 * Decodifica un JWT sin validar la firma
 * Nota: Esta función NO valida la firma del token
 */
function decodeJWT(token: string) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Token inválido");
    }

    // Decodificar la parte payload (segunda parte)
    const payload = parts[1];
    const decoded = JSON.parse(atob(payload));

    return decoded;
  } catch (error) {
    throw new Error("No se pudo decodificar el token");
  }
}
