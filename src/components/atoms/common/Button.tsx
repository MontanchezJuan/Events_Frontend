import { ButtonHTMLAttributes, ReactNode } from "react";
import {
  Size,
  SizeButtons,
  SizeTexts,
} from "../../../interfaces/Size.interfaces";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: Size;
  forForm?: boolean;
}

const Button = ({
  children,
  className = "",
  size = "md",
  forForm = false,
  ...props
}: ButtonProps) => {
  const defaultClassName =
    "flex items-center justify-center min-w-[120px] select-none font-semibold";
  const appliedClassName = `${defaultClassName} ${SizeButtons[size]} ${SizeTexts[size]} ${className} ${forForm && "w-[240px]"}`;

  return (
    <button className={appliedClassName} {...props}>
      {children}
    </button>
  );
};

export const PrimaryButton = (props: ButtonProps) => {
  return (
    <Button
      className="bg-[#00ff66] text-zinc-900 transition-colors duration-700 hover:bg-[#00B347]"
      {...props}
    />
  );
};

export const ButtonBlack = (props: ButtonProps) => {
  return <Button className="bg-zinc-900 text-white" {...props} />;
};

export const ButtonBorderWhite = (props: ButtonProps) => {
  return <Button className="border border-white" {...props} />;
};
