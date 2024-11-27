import { forwardRef, TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

const getClassNames = (className: string, error?: string): string => {
  const defaultClassName =
    "border rounded-lg w-[240px] px-4 py-2 bg-transparent text-white resize-none";
  return `${defaultClassName} ${className} ${
    error ? "border-red-700" : "border-white"
  }`;
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className = "", error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={getClassNames(className, error)}
        {...props}
      />
    );
  },
);
