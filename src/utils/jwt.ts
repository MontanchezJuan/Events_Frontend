import { Alert } from "./swal";

// Función para verificar si el token JWT ha expirado
export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true; // Si no hay token, está considerado expirado

  try {
    // Verificar que el token tenga el formato adecuado
    const tokenParts = token.split(".");
    if (tokenParts.length !== 3) {
      throw new Error("El token no tiene el formato JWT adecuado");
    }

    // Separar el payload del token JWT
    const payloadBase64 = tokenParts[1];

    // Reemplazar caracteres no compatibles en Base64
    const payloadBase64Fixed = payloadBase64
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    // Decodificar el payload
    const payloadJson = JSON.parse(atob(payloadBase64Fixed));
    const exp = payloadJson.exp;

    if (!exp) return true; // Si el token no tiene un campo exp, lo consideramos expirado

    // Obtener el tiempo actual en segundos
    const now = Math.floor(Date.now() / 1000);

    // Verificar si el tiempo actual es mayor al de expiración
    return now > exp;
  } catch (e) {
    // Si ocurre un error, consideramos que el token ha expirado
    Alert({ message: "Error al procesar los datos del token" });
    console.error("Error al decodificar el token:", e);
    localStorage.removeItem("token");
    return true;
  }
};
