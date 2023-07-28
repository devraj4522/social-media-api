const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8000"
    : "https://cors-anywhere.herokuapp.com/https://social-server-eh41.onrender.com";

export default baseUrl;
