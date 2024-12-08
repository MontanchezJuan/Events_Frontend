export interface Notification {
  _id: string;
  date: string;
  event_id: string;
  event_image: string;
  event_name: string;
  message: string;
  notification_type: "agenda" | "anuncio" | "recordatorio";
}
