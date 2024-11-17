import React from "react";
import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";

export interface MessageAppProps {
  message: string;
  severity: "success" | "error" | "warning" | "info";
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

const MessageApp: React.FC<MessageAppProps> = ({
  message,
  severity,
  setOpen,
  open,
}) => {
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
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
