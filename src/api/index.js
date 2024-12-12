import axios from "axios";

export default axios.create({
  baseURL: "https://morpion-api.edu.netlor.fr",
  headers: {
    "Content-type": "application/json",
    "Authorization": `key=${import.meta.env.API_KEY}`
  }
})
