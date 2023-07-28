const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8000"
    : "https://social-server-eh41.onrender.com";

export default baseUrl;
