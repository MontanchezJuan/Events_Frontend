import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { login } from "../../../api/services/securityService";
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
    password: yup.string().required("La contraseña es obligatoria."),
  })
  .required();
export type LoginFormData = yup.InferType<typeof schema>;

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    defaultValues: { email: "nicolas@gmail.com", password: "123456789" },
  });

  const onSubmit = async (data: LoginFormData) => await login(data);

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
  ];

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {formFields.map((field) => (
        <div key={field.name}>
          <Input
            placeholder={field.placeholder}
            type={field.type}
            error={field.error}
            {...register(field.name as keyof LoginFormData)}
          />
          {field.error && <ErrorText>{field.error}</ErrorText>}
        </div>
      ))}

      <ButtonWhite type="submit" forForm>
        Iniciar sesión
      </ButtonWhite>
    </Form>
  );
};
