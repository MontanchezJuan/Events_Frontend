// import { yupResolver } from "@hookform/resolvers/yup";
// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import { FormField } from "../../../interfaces/Form.interfaces";
// import { ButtonWhite } from "../../atoms/common/Button";
// import { ErrorText } from "../../atoms/common/ErrorText";
// import { Input } from "../../atoms/common/Input";
// import { Form } from "../../templates/Form";
// import { User } from "../../../api/interfaces/user";

// const schema = yup.object({
//   categories: yup
//     .array()
//     .of(yup.string().required("Cada categoría debe ser una cadena de texto."))
//     .min(1, "Debe tener al menos una categoría."),
//   date: yup
//     .date()
//     .required("La fecha es obligatoria.")
//     .typeError("La fecha debe ser válida."),
//   description: yup.string().required("La descripción es obligatoria."),
//   entity: yup.string().required("La entidad es obligatoria."),
//   image: yup.string().url("La imagen debe ser una URL válida."),
//   name: yup.string().required("El nombre es obligatorio."),
//   organizer_id: yup.string().required("El ID del organizador es obligatorio."),
//   restrictions: yup
//     .array()
//     .of(
//       yup.string().required("Cada restricción debe ser una cadena de texto."),
//     ),
//   site: yup.string().required("El sitio es obligatorio."),
// });
// export type EventFormData = yup.InferType<typeof schema>;

// interface EventFormProps {
//   initialValues?: User | null;
// }

// export const UserForm = ({ initialValues }: EventFormProps) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<EventFormData>({
//     resolver: yupResolver(schema),
//     defaultValues: initialValues
//       ? {
//           ...initialValues,
//           date: new Date(initialValues.date),
//         }
//       : {
//           categories: [],
//           date: new Date(),
//           description: "",
//           entity: "",
//           image: "",
//           name: "",
//           organizer_id: "",
//           restrictions: [],
//           site: "",
//         },
//   });

//   const onSubmit = (data: EventFormData) => alert(data);

//   const formFields: FormField[] = [
//     {
//       placeholder: "Nombre del evento",
//       name: "name",
//       type: "text",
//       error: errors.name?.message,
//     },
//     {
//       placeholder: "Descripción",
//       name: "description",
//       type: "text",
//       error: errors.description?.message,
//     },
//     {
//       placeholder: "Lugar",
//       name: "site",
//       type: "text",
//       error: errors.site?.message,
//     },
//   ];

//   return (
//     <Form onSubmit={handleSubmit(onSubmit)}>
//       {formFields.map((field) => (
//         <div key={field.name}>
//           <Input
//             placeholder={field.placeholder}
//             type={field.type}
//             error={field.error}
//             {...register(field.name as keyof EventFormData)}
//           />
//           {field.error && <ErrorText>{field.error}</ErrorText>}
//         </div>
//       ))}

//       <ButtonWhite type="submit" forForm>
//         {initialValues ? "Editar evento" : "Crear evento"}
//       </ButtonWhite>
//     </Form>
//   );
// };
