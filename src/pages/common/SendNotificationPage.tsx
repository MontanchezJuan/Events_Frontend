import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdSend } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { send_notification } from "../../api/services/notificationsService";
import { PrimaryButton } from "../../components/atoms/common/Button";
import { ErrorText } from "../../components/atoms/common/ErrorText";
import { GoBack } from "../../components/atoms/common/GoBack";
import { LoaderComponent } from "../../components/atoms/common/LoaderComponent";
import { TextArea } from "../../components/atoms/common/TextArea";
import AdminLayout from "../../components/templates/AdminLayout";
import { Form } from "../../components/templates/Form";
import { Alert } from "../../utils/swal";

interface RouteParams extends Record<string, string | undefined> {
  idEvent: string;
}

const schema = yup
  .object({
    notification_type: yup
      .string()
      .required("El tipo de notificación es obligatorio."),
    message: yup.string().required("El mensaje es obligatorio."),
  })
  .required();
export type NotificationFormData = yup.InferType<typeof schema>;

export default function SendNotificationPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { idEvent } = useParams<RouteParams>();

  const navigate = useNavigate();

  const singular = "notificación";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, validatingFields },
  } = useForm<NotificationFormData>({
    resolver: yupResolver(schema),
    defaultValues: { notification_type: "anuncio" },
  });

  const onSubmit = async (data: NotificationFormData) => {
    if (idEvent) {
      const res = await send_notification({
        event_id: idEvent,
        data,
        setState: setIsLoading,
      });
      if (res) {
        Alert({
          text: `${singular} enviada correctamente`,
          icon: "success",
          title: "Ok",
        }).then(() => {
          navigate(-1);
        });
      }
    }
  };

  return (
    <AdminLayout>
      <GoBack />

      <h1 className="mb-4 text-2xl">Enviar {singular}</h1>

      {JSON.stringify(validatingFields)}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center">
          <select
            className="rounded-xl bg-white p-2 text-black"
            onChange={(e) =>
              setValue("notification_type", e.target.value, {
                shouldValidate: true,
                shouldTouch: true,
              })
            }
          >
            <option value="anuncio">anuncio</option>
            <option value="agenda">agenda</option>
            <option value="recordatorio">recordatorio</option>
          </select>
          {errors.notification_type?.message && (
            <ErrorText>{errors.notification_type?.message}</ErrorText>
          )}
        </div>

        <div>
          <TextArea
            placeholder="Mensaje"
            error={errors.message?.message}
            {...register("message")}
          />
          {errors.message?.message && (
            <ErrorText>{errors.message?.message}</ErrorText>
          )}
        </div>

        <PrimaryButton disabled={isLoading} type="submit" forForm>
          <LoaderComponent isLoading={isLoading}>
            Enviar {singular}
            <MdSend />
          </LoaderComponent>
        </PrimaryButton>
      </Form>
    </AdminLayout>
  );
}
