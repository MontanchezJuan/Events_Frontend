import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { MdAccountCircle, MdSave } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { UserProfile } from "../../../api/interfaces/user";
import {
  create_profile,
  update_profile,
} from "../../../api/services/profilesService";
import { FormField } from "../../../interfaces/Form.interfaces";
import { ADMINROUTES } from "../../../routes/Admin.routes";
import useStore from "../../../store/useStore";
import { Alert } from "../../../utils/swal";
import { PrimaryButton } from "../../atoms/common/Button";
import { ErrorText } from "../../atoms/common/ErrorText";
import { GoBack } from "../../atoms/common/GoBack";
import { Input } from "../../atoms/common/Input";
import { LoaderComponent } from "../../atoms/common/LoaderComponent";
import { Form } from "../../templates/Form";

const schema = yup
  .object({
    id: yup.string().required(":c"),
    profilePhoto: yup.string().required("Foto de perfil es obligatoria."),
    name: yup.string().required("El nombre de usuario es obligatoria."),
  })
  .required();
type ProfileData = yup.InferType<typeof schema>;

interface ProfileFormProps {
  initialValues?: UserProfile | null;
}

export const ProfileForm = ({ initialValues }: ProfileFormProps) => {
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);
  const navigate = useNavigate();

  const user = useStore((store) => store.user);
  const get_user = useStore((store) => store.get_user);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileData>({
    resolver: yupResolver(schema),
    defaultValues: initialValues ? initialValues : {},
  });

  const formFields: FormField[] = [
    {
      placeholder: "Nueva foto de perfil",
      name: "profilePhoto",
      type: "text",
      error: errors.profilePhoto?.message,
    },
    {
      placeholder: "Nombre de usuario",
      name: "name",
      type: "text",
      error: errors.name?.message,
    },
  ];

  const onSubmit = async (data: ProfileData) => {
    if (initialValues) {
      const res = await update_profile({
        id: initialValues.id,
        newData: data,
        setState: setIsLoadingButton,
      });
      if (res) {
        if (initialValues.id === user.id) {
          get_user();
        }
        Alert({
          title: "Ok",
          text: "Perfil actualizado correctamente",
          icon: "success",
        }).then(() => {
          navigate(-1);
        });
      }
    } else {
      const res = await create_profile({
        newData: data,
        setState: setIsLoadingButton,
      });
      if (res) {
        Alert({
          title: "Ok",
          text: "Perfil creado correctamente",
          icon: "success",
        }).then(() => {
          navigate(ADMINROUTES.PROFILES);
        });
      }
    }
  };

  const profilePhoto = useWatch({
    control,
    name: "profilePhoto",
  });

  const name = useWatch({
    control,
    name: "name",
  });

  const Image = () => {
    if (profilePhoto) {
      return (
        <img
          className="rounded-full"
          style={{
            width: "200px",
            height: "200px",
            objectFit: "cover",
            display: "block",
            margin: "0 auto",
          }}
          src={profilePhoto}
          alt={name || "photo profile"}
        />
      );
    }

    return (
      <div className="flex justify-center">
        <MdAccountCircle style={{ width: "200px", height: "200px" }} />
      </div>
    );
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-5xl font-bold text-center">
        {initialValues ? "Editar perfil" : "Crear perfil"}
      </h1>

      <div className="p-4 rounded-lg bg-zinc-500">
        <div className="flex">
          <GoBack />
        </div>

        <Image />

        <Form className="gap-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
          {formFields.map((field) => (
            <div key={field.name}>
              <Input
                placeholder={field.placeholder}
                type={field.type}
                error={field.error}
                {...register(field.name as keyof ProfileData)}
              />
              {field.error && <ErrorText>{field.error}</ErrorText>}
            </div>
          ))}

          <PrimaryButton disabled={isLoadingButton} type="submit" forForm>
            <LoaderComponent isLoading={isLoadingButton}>
              <MdSave /> Guardar
            </LoaderComponent>
          </PrimaryButton>
        </Form>
      </div>
    </div>
  );
};
