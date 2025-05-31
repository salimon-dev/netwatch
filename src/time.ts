import moment from "moment";

export function dateStringToHuman(dateString?: string, utc = false) {
  if (!dateString) return "N.D";
  const format = "YYYY/MM/DD HH:mm";
  if (utc) return moment.utc(dateString).format(format);
  return moment(dateString).format(format);
}
