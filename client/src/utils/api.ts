import axios from 'axios';

const BACKEND_URL = process.env.NODE_ENV === "development" ? "http://localhost:9000" : "";

const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

export default api;