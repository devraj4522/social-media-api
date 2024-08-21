const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8000"
    : "https://social-media-server-o0lb.onrender.com";

export default baseUrl;
