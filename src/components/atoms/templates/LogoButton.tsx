import { useLocation, useNavigate } from "react-router-dom";
import { COMMON_ROUTES } from "../../../pages/common/common.routes";

export const LogoButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <button
      className="cursor-pointer select-none text-2xl"
      onClick={() => {
        if (location.pathname !== COMMON_ROUTES.LANDING) {
          navigate(COMMON_ROUTES.LANDING);
        }
      }}
    >
      Uboleta
    </button>
  );
};
