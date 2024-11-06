import { useNavigate } from "react-router-dom";
import { PUBLICROUTES } from "../../../routes/Public.routes";
import useStore from "../../../store/useStore";
import { ButtonBorderWhite, PrimaryButton } from "../../atoms/common/Button";
import { AccountNavItem } from "./Account.NavItem";

interface RoleSwitcherProps {
  closeMenu: () => void;
}

export const RoleSwitcher = ({ closeMenu }: RoleSwitcherProps) => {
  const { name: role } = useStore((store) => store.user.role);

  const navigate = useNavigate();

  const handleClick = (to: string) => {
    closeMenu();
    navigate(to);
  };

  if (role === "unauthenticated") {
    return (
      <>
        <PrimaryButton onClick={() => handleClick(PUBLICROUTES.LOGIN)}>
          Iniciar Sesión
        </PrimaryButton>

        <ButtonBorderWhite onClick={() => handleClick(PUBLICROUTES.SIGNUP)}>
          Registrarse
        </ButtonBorderWhite>
      </>
    );
  }

  return <AccountNavItem />;
};
