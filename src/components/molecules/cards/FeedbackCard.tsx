import { useEffect, useState } from "react";
import { MdStar } from "react-icons/md";
import { FeedBack } from "../../../api/interfaces/feedback";
import { list_feedbacks } from "../../../api/services/feedbacksService";
import { LoaderComponent } from "../../atoms/common/LoaderComponent";
import { NotData } from "../../atoms/common/NotData";

interface FeedbackCardProps {
  event_id: string | undefined;
}

export const FeedbackCard = ({ event_id }: FeedbackCardProps) => {
  const [hasFeedback, setHasFeedback] = useState<FeedBack[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log(hasFeedback);

  const get_feedback = async () => {
    if (event_id) {
      setHasFeedback(
        await list_feedbacks({
          params: { event_id },
          setState: setIsLoading,
        }),
      );
    }
  };

  useEffect(() => {
    get_feedback();
  }, []);

  return (
    <section className="flex flex-col">
      <p className="text-xl font-semibold">Calificaciones y comentarios</p>

      <LoaderComponent isLoading={isLoading}>
        {hasFeedback.length > 0 ? (
          hasFeedback.map((feedback) => (
            <div className="flex items-center gap-2">
              <strong>Calificación:</strong>

              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <MdStar
                    className={`text-2xl ${
                      star <= feedback.stars
                        ? "text-[#00ff66]"
                        : "text-gray-500"
                    }`}
                    key={star}
                  />
                ))}
              </div>
              {feedback.message && (
                <div className="flex h-[24px] w-full gap-1 overflow-hidden">
                  <strong>Comentario:</strong>

                  <span>{feedback.message}</span>
                </div>
              )}
            </div>
          ))
        ) : (
          <NotData />
        )}
      </LoaderComponent>
    </section>
  );
};
