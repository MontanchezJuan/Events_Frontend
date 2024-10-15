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
      src="https://media.licdn.com/dms/image/v2/D4E35AQFX6xRNnV9noQ/profile-framedphoto-shrink_100_100/profile-framedphoto-shrink_100_100/0/1676948006086?e=1729440000&v=beta&t=vJT-IlXKnIKrY4uRZyHVbTKLtfH9U8FjtTdIUsl747o"
      alt="juan"
    />
    <span>Cuenta</span>
  </ButtonBlack>
);
