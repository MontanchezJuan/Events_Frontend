import { MdVisibility, MdVisibilityOff } from "react-icons/md";

export const PasswordToggle = ({
  showPassword,
  toggleVisibility,
}: {
  showPassword: boolean;
  toggleVisibility: () => void;
}) => (
  <button
    type="button"
    onClick={toggleVisibility}
    className="absolute right-2 top-1/3 text-white"
  >
    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
  </button>
);
