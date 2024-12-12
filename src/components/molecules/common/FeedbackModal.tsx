import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdStar } from "react-icons/md";
import * as yup from "yup";
import { create_feedback } from "../../../api/services/feedbacksService";
import useStore from "../../../store/useStore";
import { Alert } from "../../../utils/swal";
import { PrimaryButton } from "../../atoms/common/Button";
import { ErrorText } from "../../atoms/common/ErrorText";
import { LoaderComponent } from "../../atoms/common/LoaderComponent";
import { TextArea } from "../../atoms/common/TextArea";
import { Form } from "../../templates/Form";

interface FeedbackModalProps {
  event_id: string;
  open: boolean;
  get_feedback: () => Promise<void>;
  handleClose: () => void;
}

const style: React.CSSProperties = {
  transform: "translate(-50%, -50%)",
};

const schema = yup
  .object({
    stars: yup.number().required("La calificación es obligatoria."),
    message: yup.string(),
  })
  .required();
export type FeedbackData = yup.InferType<typeof schema>;

export const FeedbackModal = (props: FeedbackModalProps) => {
  const { event_id, open, handleClose, get_feedback } = props;

  const user_id = useStore((store) => store.user.id);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [selectedStar, setSelectedStar] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FeedbackData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FeedbackData) => {
    const res = await create_feedback({
      newData: { ...data, event_id, user_id },
      setState: setIsLoading,
    });
    if (res) {
      get_feedback();
      handleClose();
      Alert({
        title: "Ok",
        text: res,
        icon: "success",
      });
    }
  };

  const handleStarClick = (star: number) => {
    setSelectedStar(star);
    setValue("stars", star);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div
        className="absolute left-1/2 top-1/2 flex h-[300px] w-[360px] flex-col items-center justify-center gap-6 rounded-lg bg-[#2f2f2f]"
        style={style}
      >
        <p className="text-xl font-semibold">Calificar evento</p>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex min-w-full flex-col items-center gap-2">
            ¿Cuánto te gusto este evento?
            <div className="flex w-full items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <MdStar
                  key={star}
                  className={`cursor-pointer text-xl ${
                    hoveredStar !== null && star <= hoveredStar
                      ? "text-[#00ff66]"
                      : selectedStar !== null && star <= selectedStar
                        ? "text-[#00ff66]"
                        : "text-gray-500"
                  }`}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(null)}
                  onClick={() => handleStarClick(star)}
                />
              ))}
            </div>
            {errors.stars?.message && (
              <ErrorText>{errors.stars?.message}</ErrorText>
            )}
          </div>

          <div className="flex min-w-full flex-col items-center gap-2">
            Si quieres puedes dejar un comentario
            <TextArea
              className="w-full"
              placeholder="Comentario (Opcional)"
              error={errors.message?.message}
              {...register("message")}
            />
            {errors.message?.message && (
              <ErrorText>{errors.message?.message}</ErrorText>
            )}
          </div>

          <PrimaryButton disabled={isLoading}>
            <LoaderComponent isLoading={isLoading}>Calificar</LoaderComponent>
          </PrimaryButton>
        </Form>
      </div>
    </Modal>
  );
};
