export interface MessageState {
  currentMessage: string | null;
  open: boolean;
  severity: "info" | "success" | "warning" | "error";
}
