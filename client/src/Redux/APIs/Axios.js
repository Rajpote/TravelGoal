import axios from "axios"; // Only import axios

const api = axios.create({
   baseURL: "http://localhost:5000/api",
});

export default api;
