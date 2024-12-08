import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { MdAdd, MdCreate } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Permission, Role } from "../../../api/interfaces/user";
import { list_permissions } from "../../../api/services/permissionsService";
import {
  create_role,
  match_role,
  unmatch_role,
  update_role,
} from "../../../api/services/rolesService";
import { ADMINROUTES } from "../../../routes/Admin.routes";
import { Alert } from "../../../utils/swal";
import { PrimaryButton } from "../../atoms/common/Button";
import { ErrorText } from "../../atoms/common/ErrorText";
import { Input } from "../../atoms/common/Input";
import { Loader } from "../../atoms/common/Loader";
import { LoaderComponent } from "../../atoms/common/LoaderComponent";
import { TextArea } from "../../atoms/common/TextArea";
import { Form } from "../../templates/Form";

const schema = yup.object({
  name: yup.string().required("El nombre del rol es obligatorio."),
  description: yup.string().required("La descripción del rol es obligatoria."),
});
export type RoleData = yup.InferType<typeof schema>;

interface RoleFormProps {
  initialValues?: Role | null;
}

export const RoleForm = ({ initialValues }: RoleFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingPermissions, setIsLoadingPermissions] =
    useState<boolean>(false);
  const [permissions, setPermissions] = useState<Permission[] | []>([]);
  const [filterMethod, setFilterMethod] = useState<string>("ALL");
  const [loadingPermissionId, setLoadingPermissionId] = useState<string | null>(
    null,
  );

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoleData>({
    resolver: yupResolver(schema),
    defaultValues: initialValues
      ? { name: initialValues.name, description: initialValues.description }
      : { name: "", description: "" },
  });

  const onSubmit = async (data: RoleData) => {
    if (initialValues) {
      if (initialValues.name !== "admin") {
        const ok = await update_role({
          id: initialValues.id,
          newData: data,
          setState: setIsLoading,
        });
        if (ok) {
          Alert({
            text: "Rol actualizado correctamente",
            icon: "success",
            title: "Ok",
          }).then(() => {
            navigate(ADMINROUTES.ROLES);
          });
        }
      } else {
        Alert({ text: "No se puede actualizar el rol de administrador" });
      }
    } else {
      const ok = await create_role({
        newData: data,
        setState: setIsLoading,
      });
      if (ok) {
        Alert({
          text: "Rol creado correctamente",
          icon: "success",
          title: "Ok",
        }).then(() => {
          navigate(ADMINROUTES.ROLES);
        });
      }
    }
  };

  const getPermissions = async () =>
    setPermissions(
      await list_permissions({
        setState: setIsLoadingPermissions,
      }),
    );

  useEffect(() => {
    if (initialValues) {
      getPermissions();
    }
  }, []);

  const filteredPermissions = useMemo(() => {
    if (filterMethod === "ALL") {
      return permissions;
    }
    return permissions.filter(
      (permission) => permission.method === filterMethod,
    );
  }, [filterMethod, permissions]);

  const matchPermissions = useMemo(
    () =>
      filteredPermissions.map((permission, index) => {
        const isPermission =
          initialValues &&
          initialValues.totalPermissions &&
          initialValues.totalPermissions.find(
            (thisPermission) => thisPermission.id === permission.id,
          );

        return (
          <div
            key={permission.id}
            className={`${index % 2 === 1 && "bg-zinc-800"} flex items-center gap-2 p-2`}
          >
            {loadingPermissionId === permission.id ? (
              <Loader size={40} />
            ) : (
              <input
                type="checkbox"
                defaultChecked={!!isPermission}
                disabled={initialValues?.name === "admin"}
                onChange={(e) => {
                  setLoadingPermissionId(permission.id);
                  if (initialValues) {
                    if (initialValues.name !== "admin") {
                      if (e.target.checked) {
                        match_role({
                          idRole: initialValues.id,
                          idPerm: permission.id,
                          setState: setLoadingPermissionId,
                        });
                      } else {
                        unmatch_role({
                          idRole: initialValues.id,
                          idPerm: permission.id,
                          setState: setLoadingPermissionId,
                        });
                      }
                    } else {
                      Alert({
                        text: "No se puede actualizar el rol de administrador",
                      });
                    }
                  }
                }}
              />
            )}
            <span className="flex w-[72px] items-center justify-center gap-1 rounded-lg px-2 py-1 text-sm text-gray-500">
              {permission.method}
            </span>
            <span className="w-[200px]">{permission.route}</span>
            <span className="hidden w-[400px] md:block">
              {permission.description}
            </span>
          </div>
        );
      }),
    [filteredPermissions, initialValues],
  );

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          placeholder="Nombre"
          type="text"
          error={errors.name?.message}
          {...register("name")}
        />
        {errors.name?.message && <ErrorText>{errors.name?.message}</ErrorText>}
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

      {initialValues?.name !== "admin" && (
        <PrimaryButton disabled={isLoading} type="submit" forForm>
          <LoaderComponent isLoading={isLoading}>
            {initialValues ? (
              <>
                <MdCreate /> Editar rol
              </>
            ) : (
              <>
                <MdAdd /> Crear rol
              </>
            )}
          </LoaderComponent>
        </PrimaryButton>
      )}

      {initialValues ? (
        <div className="flex flex-col mb-4 border rounded-lg border-zinc-800">
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-4">
              Filtrar por metodo:
              <select
                className="p-2 text-black bg-white rounded-xl"
                value={filterMethod}
                onChange={(e) => setFilterMethod(e.target.value)}
              >
                <option value="ALL">ALL</option>
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
            Total permisos: {initialValues?.totalPermissions?.length}
          </div>

          <LoaderComponent isLoading={isLoadingPermissions}>
            {matchPermissions}
          </LoaderComponent>
        </div>
      ) : (
        <p className="flex items-center justify-center gap-1 px-2 py-1 text-sm text-gray-500 rounded-lg">
          Para asignar permisos, primero se debe crear el rol y después
          añadirlos.
        </p>
      )}
    </Form>
  );
};
