import { useCallback, useEffect, useState } from "react";
import { MdLogout, MdNotifications } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Notification } from "../../../api/interfaces/notification";
import { get_notifications } from "../../../api/services/notificationsService";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { USERROUTES } from "../../../routes/User.routes";
import useStore from "../../../store/useStore";
import { NotificationComponent } from "../../atoms/common/NotificationComponent";
import { UnderlineText } from "../../atoms/common/UnderlineText";
import { ProfileButton } from "../common/ProfileButton";
import { AccountMenu } from "./AccountMenu";

export const AccountNavItem = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showNotificacitions, setShowNotificacitions] =
    useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[] | []>([]);

  const navigate = useNavigate();

  const closeMenu = useCallback(() => {
    setShowMenu(false);
  }, []);
  const closeMenu1 = useCallback(() => {
    setShowNotificacitions(false);
  }, []);

  const handleProfileClick = useCallback(() => {
    navigate(USERROUTES.MyProfile);
  }, []);

  const handleLogoutClick = useCallback(() => {
    localStorage.removeItem("token");
    useStore.getState().resetUser();
  }, []);

  const menuRef = useClickOutside(closeMenu);
  const menuRef1 = useClickOutside(closeMenu1);

  const fetchNotifications = async () => {
    setNotifications(await get_notifications());
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="relative flex items-center gap-2">
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

      <MdNotifications
        className="hidden text-xl md:flex"
        onClick={() => setShowNotificacitions(!showNotificacitions)}
      />
      {showNotificacitions && (
        <div
          className="absolute right-full top-full flex max-h-[90vh] min-w-[320px] flex-col gap-1 overflow-y-auto rounded bg-white p-2 text-sm text-black"
          ref={menuRef1}
        >
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <NotificationComponent
                key={notification._id}
                notification={notification}
              />
            ))
          ) : (
            <div
              className={`flex flex-col items-center gap-1 rounded-lg bg-[#00ff66] p-2 font-semibold text-black`}
            >
              Aún no hay notificaciones
            </div>
          )}
        </div>
      )}

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
