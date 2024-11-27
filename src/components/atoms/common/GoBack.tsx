import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "./Button";

export const GoBack = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-4">
      <PrimaryButton onClick={() => navigate(-1)}>
        <MdArrowBack />
        Volver
      </PrimaryButton>
    </div>
  );
};
