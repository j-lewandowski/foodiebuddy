export default function decodeQueryParam(p: string) {
  return decodeURIComponent(p.replace(/\+/g, " "));
}
