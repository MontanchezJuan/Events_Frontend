import React, { ButtonHTMLAttributes } from "react";

enum ButtonColors {
  blue = "bg-blue-500 hover:bg-blue-800 focus:ring-blue-400",
  green = "bg-green-500 hover:bg-green-800 focus:ring-green-400",
  red = "bg-red-500 hover:bg-red-800 focus:ring-red-400",
  yellow = "bg-yellow-500 hover:bg-yellow-800 focus:ring-yellow-400",
  gray = "bg-zinc-400",
}

interface TableButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: keyof typeof ButtonColors;
  rounded?: boolean;
}

export const TableButton: React.FC<TableButtonProps> = ({
  children,
  color = "blue",
  rounded,
  ...props
}) => {
  return (
    <button
      className={`${ButtonColors[color]} ${rounded ? "rounded-full p-3" : "min-w-[100px] rounded-lg px-4 py-2"} whitespace-nowrap font-semibold text-white shadow-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-75`}
      {...props}
    >
      {children}
    </button>
  );
};
