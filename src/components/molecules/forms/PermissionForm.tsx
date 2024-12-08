import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdAdd, MdCreate } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Permission } from "../../../api/interfaces/user";
import {
  create_permission,
  update_permission,
} from "../../../api/services/permissionsService";
import { ADMINROUTES } from "../../../routes/Admin.routes";
import { Alert } from "../../../utils/swal";
import { PrimaryButton } from "../../atoms/common/Button";
import { ErrorText } from "../../atoms/common/ErrorText";
import { Input } from "../../atoms/common/Input";
import { LoaderComponent } from "../../atoms/common/LoaderComponent";
import { TextArea } from "../../atoms/common/TextArea";
import { Form } from "../../templates/Form";

const schema = yup
  .object({
    route: yup.string().required("La ruta es obligatoria."),
    method: yup.string().required("El método es obligatorio."),
    description: yup.string().required("La descripción es obligatoria."),
  })
  .required();
export type PermissionFormData = yup.InferType<typeof schema>;

interface PermissionFormProps {
  initialValues?: Permission | null;
}

export const PermissionForm = ({ initialValues }: PermissionFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const singular = "permiso";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PermissionFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialValues ? { ...initialValues } : {},
  });

  const onSubmit = async (data: PermissionFormData) => {
    if (initialValues) {
      const ok = await update_permission({
        id: initialValues.id,
        newData: data,
        setState: setIsLoading,
      });
      if (ok) {
        Alert({
          text: `${singular} actualizado correctamente`,
          icon: "success",
          title: "Ok",
        }).then(() => {
          navigate(ADMINROUTES.PERMISSIONS);
        });
      }
    } else {
      const ok = await create_permission({
        newData: data,
        setState: setIsLoading,
      });
      if (ok) {
        Alert({
          text: `${singular} creado correctamente`,
          icon: "success",
          title: "Ok",
        }).then(() => {
          navigate(ADMINROUTES.PERMISSIONS);
        });
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center">
        <select
          className="p-2 text-black bg-white rounded-xl"
          onChange={(e) =>
            setValue("method", e.target.value, {
              shouldValidate: true,
              shouldTouch: true,
            })
          }
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
        {errors.method?.message && (
          <ErrorText>{errors.method?.message}</ErrorText>
        )}
      </div>

      <div>
        <Input
          placeholder="Ruta"
          type="text"
          error={errors.route?.message}
          {...register("route")}
        />
        {errors.route?.message && (
          <ErrorText>{errors.route?.message}</ErrorText>
        )}
      </div>

      <div>
        <TextArea
          placeholder="Descripción"
          error={errors.description?.message}
          {...register("description")}
        />
        {errors.description?.message && (
          <ErrorText>{errors.description?.message}</ErrorText>
        )}
      </div>

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
