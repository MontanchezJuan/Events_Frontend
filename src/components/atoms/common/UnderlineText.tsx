import { ButtonHTMLAttributes, ReactNode } from "react";
import { Size, SizeTexts, XSize } from "../../../interfaces/Size.interfaces";

type Colors = "after:bg-zinc-900" | "after:bg-white";

interface UnderlineTextProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color: Colors;
  size?: Size | XSize;
}

export const UnderlineText = ({
  children,
  color,
  size = "md",
  ...props
}: UnderlineTextProps) => {
  return (
    <button
      className={`relative flex items-center gap-1 ${SizeTexts[size]} after:absolute after:bottom-0 after:left-0 after:h-[2px] after:content-[''] ${color} after:w-full after:origin-right after:scale-x-0 after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100`}
      {...props}
    >
      {children}
    </button>
  );
};
