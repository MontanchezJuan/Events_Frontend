import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { sign_up } from "../../../api/services/securityService";
import { FormField } from "../../../interfaces/Form.interfaces";
import { PrimaryButton } from "../../atoms/common/Button";
import { ErrorText } from "../../atoms/common/ErrorText";
import { Input } from "../../atoms/common/Input";
import { Loader } from "../../atoms/common/Loader";
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
export type SignupFormData = yup.InferType<typeof schema>;

export const SignupForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: SignupFormData) =>
    sign_up({ ...data, setState: setIsLoading, navigate });

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
            {...register(field.name as keyof SignupFormData)}
          />
          {field.error && <ErrorText>{field.error}</ErrorText>}
        </div>
      ))}

      <PrimaryButton disabled={isLoading} type="submit" forForm>
        {isLoading ? <Loader size={20} /> : "Registrarse"}
      </PrimaryButton>
    </Form>
  );
};
