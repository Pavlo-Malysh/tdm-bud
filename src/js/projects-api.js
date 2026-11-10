import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

axios.defaults.baseURL = API_URL

export async function getProjects() {
  const response = await axios.get(
    "/projects"
  );

  console.log(response.data.data);
}


getProjects()