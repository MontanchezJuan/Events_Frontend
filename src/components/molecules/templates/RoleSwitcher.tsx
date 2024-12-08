import { useNavigate } from "react-router-dom";
import { PUBLICROUTES } from "../../../routes/Public.routes";
import useStore from "../../../store/useStore";
import { ButtonBorder, PrimaryButton } from "../../atoms/common/Button";
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
        <PrimaryButton onClick={() => handleClick(PUBLICROUTES.Login)}>
          Iniciar Sesión
        </PrimaryButton>

        <ButtonBorder onClick={() => handleClick(PUBLICROUTES.Signup)}>
          Registrarse
        </ButtonBorder>
      </>
    );
  }

  return <AccountNavItem />;
};
