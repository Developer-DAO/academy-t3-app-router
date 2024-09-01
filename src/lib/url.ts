export function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  const vc = process.env.VERCEL_URL;
  if (vc) return `https://${vc}`;
  return "http://localhost:3000";
}
