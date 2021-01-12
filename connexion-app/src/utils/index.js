/*eslint no-undef: 0*/
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

export function firebaseErrorMsg(code) {
  if (code === "auth/user-not-found") return "Account does not exist";
  else if (code === "auth/wrong-password") return "Invalid email/password";
  else if (code === "auth/network-request-failed")
    return "Network / Connection error";
  else return "An error has occurred";
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
