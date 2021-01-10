import React from "react";
import { Snackbar, IconButton } from "@material-ui/core";
import { MdClose } from "react-icons/md";
import { Alert } from "@material-ui/lab";

const ErrorSnackbar = (props) => {
  const {
    isErrorVisible,
    handleClose = () => {},
    message = "Error",
    type = "desktop", // desktop, mobile, fullscreen
  } = props;

  const setAnchorOrigin = () => {
    return type === "mobile" || type === "fullscreen"
      ? { vertical: "top", horizontal: "center" }
      : { vertical: "bottom", horizontal: "left" };
  };

  const setMarginOffset = () => {
    if (type === "mobile") return { marginTop: "6vh" };
    else return {};
  };

  return (
    <Snackbar
      anchorOrigin={setAnchorOrigin()}
      style={setMarginOffset()}
      open={isErrorVisible}
      autoHideDuration={6000}
      onClose={handleClose}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <MdClose />
        </IconButton>
      }
    >
      <Alert onClose={handleClose} severity="error">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
