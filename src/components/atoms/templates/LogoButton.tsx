import { Link } from "react-router-dom";

interface LogoButtonProps {
  color: "text-zinc-900 dark:text-white" | "text-white dark:text-zinc-900";
}

export const LogoButton = ({ color }: LogoButtonProps) => {
  return (
    <Link
      to="/"
      className={`${color} cursor-pointer select-none text-2xl font-extrabold`}
    >
      Uboleta
    </Link>
  );
};
