import axios from "axios";

const api = axios.create({
  baseURL: "https://morpion-api.edu.netlor.fr",
  headers: {
    "Content-type": "application/json"
  }
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.apiKey) {
    config.headers.Authorization = `key=${user.apiKey}`;
  }
  return config;
});

export default api;
