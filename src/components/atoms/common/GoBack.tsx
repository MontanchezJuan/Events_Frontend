import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "./Button";

export const GoBack = ({ noMargin }: { noMargin?: boolean }) => {
  const navigate = useNavigate();

  return (
    <div className={`${!noMargin && "mb-4"}`}>
      <PrimaryButton onClick={() => navigate(-1)}>
        <MdArrowBack />
        Volver
      </PrimaryButton>
    </div>
  );
};
