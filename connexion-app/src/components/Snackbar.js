import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar, IconButton } from "@material-ui/core";
import { MdClose } from "react-icons/md";
import { Alert } from "@material-ui/lab";
import * as actApp from "../store/App/ac-App";

const GlobalSnackbar = () => {
  const dispatch = useDispatch();
  const isSnackbarVisible = useSelector((state) => state.App.isSnackbarVisible);
  const snackbarVariant = useSelector((state) => state.App.snackbarVariant); // error, warning, info, success (from mui)
  const snackbarMsg = useSelector((state) => state.App.snackbarMsg);

  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    dispatch(actApp.handleStateGlobal({ isSnackbarVisible: false }));
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      style={{marginTop: "8vh"}}
      open={isSnackbarVisible}
      autoHideDuration={6000}
      onClose={closeSnackbar}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={closeSnackbar}
        >
          <MdClose />
        </IconButton>
      }
    >
      <Alert
        onClose={closeSnackbar}
        severity={snackbarVariant}
        color={snackbarVariant}
      >
        {snackbarMsg}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
