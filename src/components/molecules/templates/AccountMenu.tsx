import React from "react";
import { MdLogout } from "react-icons/md";
import { UnderlineText } from "../../atoms/common/UnderlineText";

interface AccountMenuProps {
  onProfile: () => void;
  onLogout: () => void;
}

export const AccountMenu = React.memo(
  ({ onLogout, onProfile }: AccountMenuProps) => (
    <div className="absolute right-0 top-full flex min-w-[200px] flex-col gap-2 rounded bg-white p-2 text-sm text-black">
      <section className="flex items-center gap-2">
        <img
          className="rounded-full"
          width={36}
          height={36}
          src="https://ritmo95.sbs.co/wp-content/uploads/sites/4/2018/09/Ozuna-090518.jpg"
          alt="juan"
        />
        <span className="text-lg">Juan Montanchez</span>
      </section>

      <div className="flex justify-center">
        <UnderlineText
          color="after:bg-zinc-900"
          onClick={onProfile}
          text="Ver perfil"
        />
      </div>

      <UnderlineText
        color="after:bg-zinc-900"
        onClick={onLogout}
        text="Cerrar Sesión"
        icon={<MdLogout />}
      />
    </div>
  ),
);
