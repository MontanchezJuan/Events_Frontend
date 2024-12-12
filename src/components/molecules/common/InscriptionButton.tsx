import { SetStateAction, useState } from "react";
import { MdStar } from "react-icons/md";
import { Event } from "../../../api/interfaces/event";
import { FeedBack } from "../../../api/interfaces/feedback";
import { Inscription } from "../../../api/interfaces/inscription";
import {
  create_inscription,
  delete_inscription,
} from "../../../api/services/inscriptionsService";
import useStore from "../../../store/useStore";
import { Alert } from "../../../utils/swal";
import {
  ButtonBorder,
  PrimaryButton,
  SecondaryButton,
} from "../../atoms/common/Button";
import { Loader } from "../../atoms/common/Loader";
import { LoaderComponent } from "../../atoms/common/LoaderComponent";
import { FeedbackModal } from "./FeedbackModal";

interface InscriptionButtonProps {
  event: Event;
  hasInscription: Inscription[] | null;
  hasFeedback: FeedBack[] | null;
  isLoadingButton: boolean;
  confirmIsSuscribed: () => Promise<void>;
  get_feedback: () => Promise<void>;
  setIsLoadingButton: React.Dispatch<SetStateAction<boolean>>;
}

export const InscriptionButton = (props: InscriptionButtonProps) => {
  const {
    event,
    hasInscription,
    isLoadingButton,
    hasFeedback,
    confirmIsSuscribed,
    get_feedback,
    setIsLoadingButton,
  } = props;

  const user_id = useStore((store) => store.user.id);
  const [open, setOpen] = useState<boolean>(false);

  const handleSuscribe = async () => {
    if (event) {
      const inscription = await create_inscription({
        newData: { event_id: event._id, user_id },
        setState: setIsLoadingButton,
      });
      confirmIsSuscribed();
      if (inscription) {
        Alert({
          title: "Ok",
          text: inscription.message,
          icon: "success",
        });
      }
    }
  };

  const handleUnsuscribe = async () => {
    if (event) {
      Alert({
        cancelButtonText: "Cancelar",
        confirmButtonText: "Sí, cancelar la suscripción",
        icon: "question",
        showCancelButton: true,
        text: `Estás seguro que deseas cancelar la suscripción en el evento: ${event.name}`,
        title: "Alerta",
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          if (hasInscription) {
            const resquest = async () => {
              const message = await delete_inscription({
                id: hasInscription[0]._id,
                setState: setIsLoadingButton,
              });
              confirmIsSuscribed();
              if (message) {
                Alert({
                  title: "Ok",
                  text: message,
                  icon: "success",
                });
              }
            };
            resquest();
          }
        }
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (hasInscription === null) {
    return (
      <ButtonBorder>
        <Loader size={40} />
      </ButtonBorder>
    );
  }

  if (hasInscription.length === 0) {
    if (!event.is_active) {
      return null;
    }

    return (
      <PrimaryButton disabled={isLoadingButton} onClick={handleSuscribe}>
        <LoaderComponent isLoading={isLoadingButton}>
          Inscribirme
        </LoaderComponent>
      </PrimaryButton>
    );
  }

  if (!event.is_active) {
    if (hasFeedback && hasFeedback.length !== 0) {
      return (
        <div className="flex flex-col gap-2">
          Tu calificación fue:
          <div className="flex w-full items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <MdStar
                className={`text-4xl ${
                  star <= hasFeedback[0].stars
                    ? "text-[#00ff66]"
                    : "text-gray-500"
                }`}
                key={star}
              />
            ))}
          </div>
        </div>
      );
    }

    return (
      <>
        <ButtonBorder onClick={() => setOpen(true)}>
          <MdStar />
          Calificar evento
        </ButtonBorder>
        <FeedbackModal
          event_id={event._id}
          open={open}
          handleClose={handleClose}
          get_feedback={get_feedback}
        />
      </>
    );
  }

  return (
    <SecondaryButton disabled={isLoadingButton} onClick={handleUnsuscribe}>
      <LoaderComponent isLoading={isLoadingButton}>
        Cancelar inscripción
      </LoaderComponent>
    </SecondaryButton>
  );
};
