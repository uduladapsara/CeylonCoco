const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

const buildHeaders = (token, extra) => ({
  "Content-Type": "application/json",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
  ...(extra || {})
});

const request = async (path, options = {}) => {
  const {
    method = "GET",
    body,
    token,
    headers
  } = options;

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: buildHeaders(token, headers),
    body: body ? JSON.stringify(body) : undefined
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data.message || "Request failed";
    throw new Error(message);
  }

  return data;
};

const getToken = () => localStorage.getItem("token");

export {
  API_URL,
  request,
  getToken
};
