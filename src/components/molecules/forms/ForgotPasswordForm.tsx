import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { ButtonWhite } from "../../atoms/common/Button";
import { ErrorText } from "../../atoms/common/ErrorText";
import { Input } from "../../atoms/common/Input";
import { Form } from "../../templates/Form";
import { FormField } from "../../../interfaces/Form.interfaces";
import { useNavigate } from "react-router-dom";
import { AUTH_ROUTES } from "../../../pages/auth/authRoutes.routes";


type FormData = yup.InferType<typeof schema>;

// Esquema de validación
const schema = yup.object().shape({
  email: yup.string().email("Debe ser un correo electrónico válido").required("El correo es obligatorio"),
});

export const ForgotPasswordForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const navigate = useNavigate();


  const onSubmit = (data: FormData) => {
    alert("Estamos trabajando en el backend para que pueda restaurar su contrasena con el correo: "+ data.email);
    navigate(AUTH_ROUTES.RESTOREPASS);
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
    <Form  onSubmit={handleSubmit(onSubmit) } className="space-y-4">
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
      
      <ButtonWhite type="submit"  forForm>
        Recuperar contraseña
      </ButtonWhite>
      <ButtonWhite type="button" onClick={() => window.history.back()} className="w-full border">
        Volver
      </ButtonWhite>
    </Form>
  );
};
