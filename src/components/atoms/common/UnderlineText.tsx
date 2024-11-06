import { ButtonHTMLAttributes, ReactNode } from "react";
import { Size, SizeTexts, XSize } from "../../../interfaces/Size.interfaces";

type Colors = "after:bg-zinc-900" | "after:bg-white";

interface UnderlineTextProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  color: Colors;
  size?: Size | XSize;
  text: string;
}

export const UnderlineText = ({
  icon,
  color,
  size = "md",
  text,
  ...props
}: UnderlineTextProps) => {
  const classes = `relative flex text-center gap-0.5 ${SizeTexts[size]} after:absolute after:bottom-0 after:left-0 after:h-[2px] after:content-[''] ${color} after:w-full after:origin-right after:scale-x-0 after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100 max-w-[160px] font-semibold select-none`;

  if (icon) {
    return (
      <span className="flex items-center gap-1 whitespace-nowrap">
        {icon}
        <span className={classes} {...props}>
          {text}
        </span>
      </span>
    );
  }

  return (
    <span className={classes} {...props}>
      {text}
    </span>
  );
};
