export interface SetMessageAction {
  currentMessage: string | null;
  open: boolean;
  severity: "info" | "success" | "warning" | "error";
}
