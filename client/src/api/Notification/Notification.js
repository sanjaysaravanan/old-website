import { notificationInstance } from "../../axios.config";

export function sendMail(data) {
  return notificationInstance.post(`/send-email`, data);
}
