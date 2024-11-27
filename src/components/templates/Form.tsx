import { FormHTMLAttributes } from "react";

interface Props extends FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  className?: string;
}

export const Form = ({ children, className = "", ...props }: Props) => {
  return (
    <form
      className={`flex flex-col items-center gap-2 ${className}`}
      {...props}
    >
      {children}
    </form>
  );
};
