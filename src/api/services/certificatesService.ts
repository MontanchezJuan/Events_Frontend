import { Alert } from "../../utils/swal";
import { axiosBusinessPDF } from "../axiosClient";
import { CERTIFICATES_ENDPOINTS } from "../endpoints";
// import { ResponseData } from "../interfaces/common";

export const generate_certificate = async ({
  inscription_id,
  setState,
}: {
  inscription_id: string;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<any | null> => {
  try {
    setState(true);

    const res = await axiosBusinessPDF.get<any>(
      `${CERTIFICATES_ENDPOINTS.GENERATE}${inscription_id}`,
    );

    return res || null;
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "Algo salió mal";
    Alert({ text: errorMessage });
    console.error("Error al generar certificado:", e);
    return null;
  } finally {
    setState(false);
  }
};
