import React from "react";
import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";

export interface MessageAppProps {
  message: string;
  severity: "success" | "error" | "warning" | "info";
  onClose: (isOpen: boolean) => void;
  open: boolean;
}

const MessageApp: React.FC<MessageAppProps> = ({
  message,
  severity,
  onClose,
  open,
}) => {
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    onClose(false);
  };
  return (
    <Snackbar open={open} onClose={handleClose} autoHideDuration={4000}>
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default MessageApp;
