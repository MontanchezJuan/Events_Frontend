import { HTMLInputTypeAttribute } from "react";

export interface FormField {
  placeholder: string;
  name: string;
  type: HTMLInputTypeAttribute;
  error: string | undefined;
}
