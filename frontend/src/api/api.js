import axios from "axios";


const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // use the env variable directly
  withCredentials: true, // if your backend uses cookies or auth
});



// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;