const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8000"
    : "social-iota-nine.vercel.app";

export default baseUrl;
