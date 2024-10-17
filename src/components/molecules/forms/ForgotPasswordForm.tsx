import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { ButtonWhite } from "../../atoms/common/Button";
import { ErrorText } from "../../atoms/common/ErrorText";
import { Input } from "../../atoms/common/Input";
import { Form } from "../../templates/Form";
import { FormField } from "../../../interfaces/Form.interfaces";


type FormData = yup.InferType<typeof schema>;

// Esquema de validación
const schema = yup.object().shape({
  email: yup.string().email("Debe ser un correo electrónico válido").required("El correo es obligatorio"),
});

export const ForgotPasswordForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('Recuperar contraseña para:', data.email);
    // Lógica para manejar la recuperación de la contraseña
  };

  const formFields: FormField[] = [
    {
      placeholder: "Correo electrónico",
      name: "email",
      type: "text",
      error: errors.email?.message,
    }
  ];

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        Recuperar contraseña
      </ButtonWhite>
      <ButtonWhite type="button" onClick={() => window.history.back()} className="w-full border">
        Volver
      </ButtonWhite>
    </Form>
  );
};
