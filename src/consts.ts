export function getNetworkEntryPoint(name: string) {
  switch (name) {
    case "official":
      return "https://api.salimon.net/nexus";
    case "development":
      return "https://dev-api.salimon.net/nexus";
    default:
      return "";
  }
}
