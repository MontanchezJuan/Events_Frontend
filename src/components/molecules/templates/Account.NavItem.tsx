import { useCallback, useState } from "react";
import { MdLogout } from "react-icons/md";
import { useClickOutside } from "../../../hooks/useClickOutside";
import useStore from "../../../store/useStore";
import { UnderlineText } from "../../atoms/common/UnderlineText";
import { ProfileButton } from "../common/ProfileButton";
import { AccountMenu } from "./AccountMenu";

export const AccountNavItem = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const closeMenu = useCallback(() => {
    setShowMenu(false);
  }, []);

  const handleProfileClick = useCallback(() => {
    alert("Ir al perfil");
  }, []);

  const handleLogoutClick = useCallback(() => {
    localStorage.removeItem("token");
    useStore.getState().resetUser();
  }, []);

  const menuRef = useClickOutside(closeMenu);

  return (
    <div className="relative">
      <div className="flex flex-col gap-6 md:hidden">
        <ProfileButton onClick={handleProfileClick} />

        <UnderlineText
          className="flex items-center gap-1"
          color="after:bg-zinc-900"
          onClick={handleLogoutClick}
          text="Cerrar Sesión"
          icon={<MdLogout />}
        />
      </div>

      <ProfileButton
        className="hidden md:flex"
        onClick={() => setShowMenu(true)}
      />

      {showMenu && (
        <div ref={menuRef}>
          <AccountMenu
            onProfile={handleProfileClick}
            onLogout={handleLogoutClick}
          />
        </div>
      )}
    </div>
  );
};
