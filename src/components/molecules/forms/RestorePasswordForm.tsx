import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ButtonWhite } from "../../atoms/common/Button";
import { ErrorText } from "../../atoms/common/ErrorText";
import { Input } from "../../atoms/common/Input";
import { Form } from "../../templates/Form";
import { FormField } from "../../../interfaces/Form.interfaces";

// Esquema de validación
const schema = yup.object({
    password: yup
    .string()
    .required("La contraseña es obligatoria.")
    .min(8, "La contraseña debe tener al menos 8 caracteres.")
    .matches(
      /[A-Z]/,
      "La contraseña debe tener al menos una letra mayúscula.",
    )
    .matches(/[0-9]/, "La contraseña debe tener al menos un número.")
    .matches(
      /[\W_]/,
      "La contraseña debe tener al menos un carácter especial.",
    ),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), undefined],
      "Las contraseñas deben coincidir.",
    )
    .required("Por favor, confirma tu contraseña.")
}).required();
type FormData = yup.InferType<typeof schema>;

export const RestorePasswordForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: FormData) => {
    alert(data.password);
  };

  
  const formFields: FormField[] = [
    {
      placeholder: "Nueva contraseña",
      name: "password",
      type: "password",
      error: errors.password?.message,
    },
    {
        placeholder: "Confirma nueva contraseña",
        name: "confirmPassword",
        type: "password",
        error: errors.confirmPassword?.message,
      }
  ];

  return (
    <Form onSubmit={handleSubmit(onSubmit) }>
       {formFields.map((field) => (
        <div key={field.name}>
          <Input
            placeholder={field.placeholder}
            type={field.type}
            error={field.error}
            {...register(field.name as keyof FormData)}
          />
          {field.error && <ErrorText>{field.error}</ErrorText>}
        </div>
      ))}
      
      <ButtonWhite  type="submit" forForm>
        Restaurar contraseña
      </ButtonWhite>
      
    </Form>
  );
};
