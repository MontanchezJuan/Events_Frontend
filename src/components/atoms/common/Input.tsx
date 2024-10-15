import { forwardRef, InputHTMLAttributes, useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Size, SizeInputs } from "../../../interfaces/Size.interfaces";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: Size;
  error?: string;
}

const getClassNames = (inputSize: Size, className: string, error?: string) => {
  const defaultClassName = "border rounded-lg w-[240px]";
  return `${defaultClassName} ${SizeInputs[inputSize]} ${className} ${
    error ? "border-red-700" : "border-white"
  }`;
};

const PasswordToggle = ({
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
  ({ error, ...props }, ref) => {
    if (props.type === "password") {
      return (
        <InputPassword
          ref={ref}
          className="bg-transparent text-white"
          error={error}
          {...props}
        />
      );
    }

    return (
      <NormalInput
        ref={ref}
        className="bg-transparent text-white"
        error={error}
        {...props}
      />
    );
  },
);
