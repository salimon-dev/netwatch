import moment from "moment";

export function dateStringToHuman(dateString: string) {
  return moment(dateString).format("YYYY/MM/DD HH:mm");
}
