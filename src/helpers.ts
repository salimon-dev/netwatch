import moment from "moment";

type DateStringFormat = "full" | "date" | "time" | "relative";
export function tsToDateString(ts?: number, outputFormat: DateStringFormat = "full") {
  if (!ts) return "N.D";
  let format = "YYYY/MM/DD HH:mm";
  switch (outputFormat) {
    case "full":
      format = "YYYY/MM/DD HH:mm";
      break;
    case "date":
      format = "YYYY/MM/DD";
      break;
    case "time":
      format = "HH:mm";
      break;
    case "relative":
      return moment(ts * 1000).fromNow();
  }
  return moment(ts * 1000).format(format);
}

export function shortenNumber(num: number): string {
  if (num >= 1e12) {
    return `${(num / 1e12).toFixed(2)}T`;
  }
  if (num >= 1e9) {
    return `${(num / 1e9).toFixed(2)}B`;
  }
  if (num >= 1e6) {
    return `${(num / 1e6).toFixed(2)}M`;
  }
  if (num >= 1e3) {
    return `${(num / 1e3).toFixed(2)}K`;
  }
  return num.toString();
}
