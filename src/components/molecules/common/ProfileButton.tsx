import { ButtonBlack } from "../../atoms/common/Button";

interface ProfileButtonProps {
  onClick: () => void;
  className?: string;
}

export const ProfileButton = ({
  onClick,
  className = "",
}: ProfileButtonProps) => (
  <ButtonBlack onClick={onClick} className={className}>
    <img
      className="rounded-full"
      width={28}
      height={28}
      src="https://ritmo95.sbs.co/wp-content/uploads/sites/4/2018/09/Ozuna-090518.jpg"
      alt="juan"
    />
    <span>Cuenta</span>
  </ButtonBlack>
);
