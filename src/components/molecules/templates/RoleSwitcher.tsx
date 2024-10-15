import { useNavigate } from "react-router-dom";
import { AUTH_ROUTES } from "../../../pages/auth/authRoutes.routes";
import { ButtonBorderWhite, ButtonWhite } from "../../atoms/common/Button";
import { AccountNavItem } from "./Account.NavItem";

interface RoleSwitcherProps {
  role: string;
  closeMenu: () => void;
}

export const RoleSwitcher = ({ role, closeMenu }: RoleSwitcherProps) => {
  const navigate = useNavigate();

  const handleClick = (to: string) => {
    closeMenu();
    navigate(to);
  };

  if (role === "not-user") {
    return (
      <>
        <ButtonWhite onClick={() => handleClick(AUTH_ROUTES.LOGIN)}>
          Iniciar Sesión
        </ButtonWhite>

        <ButtonBorderWhite onClick={() => handleClick(AUTH_ROUTES.SIGNUP)}>
          Registrarse
        </ButtonBorderWhite>
      </>
    );
  }

  return <AccountNavItem />;
};
