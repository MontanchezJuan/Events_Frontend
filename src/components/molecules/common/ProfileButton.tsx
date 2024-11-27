import { MdOutlinePeople } from "react-icons/md";
import useStore from "../../../store/useStore";

interface ProfileButtonProps {
  onClick: () => void;
  className?: string;
}

export const ProfileButton = ({
  onClick,
  className = "",
}: ProfileButtonProps) => {
  const profilePhoto = useStore((store) => store.user.userProfile.profilePhoto);
  const name = useStore((store) => store.user.userProfile.name);

  return (
    <div
      onClick={onClick}
      className={`${className} flex min-w-[120px] cursor-pointer select-none items-center justify-center gap-2 rounded-xl border px-[12px] py-[6px] text-base font-semibold text-white transition-colors duration-700 hover:border-[#00ff66] hover:text-[#00ff66]`}
    >
      {profilePhoto ? (
        <img
          className="rounded-full"
          style={{
            width: "28px",
            height: "28px",
            objectFit: "cover",
            display: "block",
            margin: "0 auto",
          }}
          src={profilePhoto}
          alt={name || "profile picture"}
        />
      ) : (
        <MdOutlinePeople />
      )}

      <span>Cuenta</span>
    </div>
  );
};
