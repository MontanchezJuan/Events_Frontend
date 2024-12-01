import React from "react";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import useStore from "../../../store/useStore";

interface AccountMenuProps {
  onProfile: () => void;
  onLogout: () => void;
}

export const AccountMenu = React.memo(
  ({ onLogout, onProfile }: AccountMenuProps) => {
    const user = useStore((store) => store.user);

    return (
      <div className="absolute right-0 top-full flex min-w-[240px] flex-col gap-2 rounded bg-white p-2 text-sm text-black">
        <section className="flex items-center gap-2 select-none">
          {user.userProfile ? (
            <img
              className="rounded-full"
              style={{
                width: "40px",
                height: "40px",
                objectFit: "cover",
                display: "block",
                margin: "0 auto",
              }}
              src={user.userProfile.profilePhoto}
              alt={user.userProfile.name || "profile picture"}
            />
          ) : (
            <MdAccountCircle style={{ width: "40px", height: "40px" }} />
          )}
          <span className="text-lg font-bold">
            {user.userProfile ? user.userProfile.name : user.email}
          </span>
        </section>

        <div
          className="flex cursor-pointer items-center justify-center gap-1 font-medium hover:text-[#00ff66]"
          onClick={onProfile}
        >
          <MdAccountCircle className="text-lg" /> Ver perfil
        </div>

        <div
          className="flex cursor-pointer items-center gap-1 font-medium hover:text-[#00ff66]"
          onClick={onLogout}
        >
          <MdLogout /> Cerrar Sesión
        </div>
      </div>
    );
  },
);
