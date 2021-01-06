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
