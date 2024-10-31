// Función para verificar si el token JWT ha expirado
export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true; // Si no hay token, está considerado expirado

  try {
    // Separar el payload del token JWT
    const payloadBase64 = token.split(".")[1];
    const payloadJson = JSON.parse(atob(payloadBase64));
    const exp = payloadJson.exp;

    if (!exp) return true; // Si el token no tiene un campo exp, lo consideramos expirado

    // Obtener el tiempo actual en segundos
    const now = Math.floor(Date.now() / 1000);

    // Verificar si el tiempo actual es mayor al de expiración
    return now > exp;
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return true; // Si ocurre un error, consideramos que el token ha expirado
  }
};
