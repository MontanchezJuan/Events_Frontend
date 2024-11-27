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
  const appliedClassName = `${className} ${defaultClassName} ${SizeButtons[size]} ${SizeTexts[size]} ${forForm && "w-[240px]"}`;

  return (
    <button className={appliedClassName} {...props}>
      {children}
    </button>
  );
};

export const PrimaryButton = (props: ButtonProps) => {
  return (
    <Button
      className="bg-[#00ff66] text-zinc-900 transition-colors duration-700 hover:bg-[#00B340]"
      {...props}
    />
  );
};

export const SecondaryButton = (props: ButtonProps) => {
  return (
    <Button
      className="bg-[#FF9F00] text-zinc-900 transition-colors duration-700 hover:bg-[#FF9F00]"
      {...props}
    />
  );
};

export const ButtonBlack = (props: ButtonProps) => {
  return <Button className="bg-zinc-900 text-white" {...props} />;
};

export const ButtonBorder = (props: ButtonProps) => {
  return (
    <Button className="border border-[#00ff66] text-[#00ff66]" {...props} />
  );
};
