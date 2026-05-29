// Resolve a server-relative upload path ("/uploads/..") to an absolute URL.
// VITE_API_URL is ".../api"; uploaded files are served from the server root.
const SERVER_ORIGIN = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(
  /\/api\/?$/,
  "",
);

export const toMediaUrl = (url) =>
  !url || /^https?:\/\//i.test(url) ? url : `${SERVER_ORIGIN}${url.startsWith("/") ? "" : "/"}${url}`;
