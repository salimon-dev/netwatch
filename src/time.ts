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
