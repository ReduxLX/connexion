import * as actApp from "../store/App/ac-App";
import store from "../store";

export function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export function truncateNum(num) {
  if (num < 1000) return num.toString();
  if (num >= 100000) return "100k+";
  return `${Math.floor(num / 1000)}k`;
}

export function truncateText(str, chars) {
  return str.length < chars ? str : str.slice(0, chars) + "...";
}

export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

export function fbError(code = null, defaultError = "An errror has occurred") {
  if (code !== null) {
    if (code === "auth/user-not-found" || code === "auth/wrong-password")
      return "Invalid username/password";
    else if (code === "auth/network-request-failed")
      return "Network / Connection error";
    else if (code === "auth/popup-closed-by-user") return "Sign in cancelled";
  }
  console.log("Unhandled Error -> ", code);
  return defaultError;
}

export function convertSecondsToDate(seconds = 45) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let date = new Date(0);
  date.setSeconds(seconds);
  return (
    date.getDate() +
    "-" +
    monthNames[date.getMonth()] +
    "-" +
    date.getFullYear()
  );
}

export function showSnackbar(variant = "success", msg = "") {
  store.dispatch(
    actApp.handleStateGlobal({
      isSnackbarVisible: true,
      snackbarVariant: variant,
      snackbarMsg: msg,
    })
  );
}
