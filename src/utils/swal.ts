import Swal, { SweetAlertIcon } from "sweetalert2";

interface AlertProps {
  color?: "#0F0F0F";
  icon?: SweetAlertIcon;
  message: string;
  title?: string;
}

export const Alert = ({
  color = "#0F0F0F",
  icon = "error",
  message,
  title = "Error",
}: AlertProps) =>
  Swal.fire({
    color: color,
    confirmButtonColor: color,
    iconColor: color,
    title: title,
    text: message,
    icon: icon,
  });
