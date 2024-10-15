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
          src="https://media.licdn.com/dms/image/v2/D4E35AQFX6xRNnV9noQ/profile-framedphoto-shrink_100_100/profile-framedphoto-shrink_100_100/0/1676948006086?e=1729440000&v=beta&t=vJT-IlXKnIKrY4uRZyHVbTKLtfH9U8FjtTdIUsl747o"
          alt="juan"
        />
        <span className="text-lg">Juan Montanchez</span>
      </section>

      <div className="flex justify-center">
        <UnderlineText color="after:bg-zinc-900" onClick={onProfile}>
          Ver perfil
        </UnderlineText>
      </div>

      <UnderlineText color="after:bg-zinc-900" onClick={onLogout}>
        <MdLogout />
        Cerrar Sesión
      </UnderlineText>
    </div>
  ),
);
