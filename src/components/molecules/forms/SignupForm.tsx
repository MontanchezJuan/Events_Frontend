import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { FormField } from "../../../interfaces/Form.interfaces";
import { ButtonWhite } from "../../atoms/common/Button";
import { ErrorText } from "../../atoms/common/ErrorText";
import { Input } from "../../atoms/common/Input";
import { Form } from "../../templates/Form";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Ups, no corresponde a un correo electrónico.")
      .required("El correo electrónico es obligatorio."),
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
      .required("Por favor, confirma tu contraseña."),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => alert(JSON.stringify(data));

  const formFields: FormField[] = [
    {
      placeholder: "Correo electrónico",
      name: "email",
      type: "text",
      error: errors.email?.message,
    },
    {
      placeholder: "Contraseña",
      name: "password",
      type: "password",
      error: errors.password?.message,
    },
    {
      placeholder: "Confirmar contraseña",
      name: "confirmPassword",
      type: "password",
      error: errors.confirmPassword?.message,
    },
  ];

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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

      <ButtonWhite type="submit" forForm>
        Registrarse
      </ButtonWhite>
    </Form>
  );
};
