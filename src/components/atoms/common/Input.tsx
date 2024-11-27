import { forwardRef, InputHTMLAttributes, useState } from "react";
import { Size, SizeInputs } from "../../../interfaces/Size.interfaces";
import { PasswordToggle } from "./PasswordToggle";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: Size;
  error?: string;
}

const getClassNames = (inputSize: Size, className: string, error?: string) => {
  const defaultClassName =
    "border rounded-lg w-[240px] bg-transparent text-white";
  return `${className} ${defaultClassName} ${SizeInputs[inputSize]} ${
    error ? "border-red-700" : "border-white"
  }`;
};

const InputPassword = forwardRef<HTMLInputElement, InputProps>(
  ({ inputSize = "md", className = "", error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const appliedClassName = getClassNames(
      inputSize,
      `${" pl-4 pr-7 py-2 " + className}`,
      error,
    );

    const togglePasswordVisibility = () =>
      setShowPassword((prevState) => !prevState);

    return (
      <div className="relative w-[240px]">
        <input
          ref={ref}
          className={appliedClassName}
          {...props}
          type={showPassword ? "text" : "password"}
        />
        <PasswordToggle
          showPassword={showPassword}
          toggleVisibility={togglePasswordVisibility}
        />
      </div>
    );
  },
);

const NormalInput = forwardRef<HTMLInputElement, InputProps>(
  ({ inputSize = "md", className = "", error, ...props }, ref) => {
    const appliedClassName = getClassNames(
      inputSize,
      `${" px-4 py-2 " + className}`,
      error,
    );

    return <input ref={ref} className={appliedClassName} {...props} />;
  },
);

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => {
    if (props.type === "password") {
      return <InputPassword ref={ref} {...props} />;
    }

    return <NormalInput ref={ref} {...props} />;
  },
);
