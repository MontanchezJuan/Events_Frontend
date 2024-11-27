import * as yup from "yup";

export const EventFormSchema = yup.object({
  categories: yup
    .array()
    .of(yup.string().required("Cada categoría debe ser una cadena de texto."))
    .min(1, "Debe tener al menos una categoría."),
  date: yup.string().required("La fecha es obligatoria."),
  description: yup.string().required("La descripción es obligatoria."),
  entity: yup.string().required("La entidad es obligatoria."),
  image: yup.string().url("La imagen debe ser una URL válida."),
  name: yup.string().required("El nombre es obligatorio."),
  restrictions: yup
    .array()
    .of(
      yup.string().required("Cada restricción debe ser una cadena de texto."),
    ),
  site: yup.string().required("El sitio es obligatorio."),
});
export type EventFormData = yup.InferType<typeof EventFormSchema>;
