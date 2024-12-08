import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdAdd, MdCreate } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { User } from "../../../api/interfaces/user";
import { sign_up } from "../../../api/services/securityService";
import { FormField } from "../../../interfaces/Form.interfaces";
import { ADMINROUTES } from "../../../routes/Admin.routes";
import { Alert } from "../../../utils/swal";
import { PrimaryButton } from "../../atoms/common/Button";
import { ErrorText } from "../../atoms/common/ErrorText";
import { Input } from "../../atoms/common/Input";
import { LoaderComponent } from "../../atoms/common/LoaderComponent";
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
  })
  .required();
export type SignupFormData = yup.InferType<typeof schema>;

interface UserFormProps {
  initialValues?: User | null;
}

export const UserForm = ({ initialValues }: UserFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const singular = "usuario";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialValues
      ? { email: initialValues.email, password: initialValues.password }
      : {},
  });

  const onSubmit = async (data: SignupFormData) => {
    if (initialValues) {
      //   const res = await update_user({
      //     id: initialValues.id,
      //     newData: data,
      //     setState: setIsLoading,
      //   });
      //   if (res) {
      //     Alert({
      //       text: "Usuario actualizado correctamente",
      //       icon: "success",
      //       title: "Ok",
      //     }).then(() => {
      //       navigate(ADMINROUTES.USERS);
      //     });
      //   }
      Alert({
        text: "uwu",
        icon: "success",
        title: "Ok",
      });
    } else {
      const res = await sign_up({
        newData: { email: data.email, password: data.password },
        setState: setIsLoading,
      });

      if (res) {
        Alert({
          text: res,
          icon: "success",
          title: "Ok",
        }).then(() => {
          navigate(ADMINROUTES.USERS);
        });
      }
    }
  };

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
      type: "text",
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
            {...register(field.name as keyof SignupFormData)}
          />
          {field.error && <ErrorText>{field.error}</ErrorText>}
        </div>
      ))}

      <PrimaryButton disabled={isLoading} type="submit" forForm>
        <LoaderComponent isLoading={isLoading}>
          {initialValues ? (
            <>
              <MdCreate /> Editar {singular}
            </>
          ) : (
            <>
              <MdAdd /> Crear {singular}
            </>
          )}
        </LoaderComponent>
      </PrimaryButton>
    </Form>
  );
};
