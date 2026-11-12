import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

axios.defaults.baseURL = API_URL

export async function getProjects() {

  try {
    const projects = await axios.get(
      "/projects"
    );
    return projects.data.data;

  } catch (error) {
    console.error("Помилка при завантаженні проектів:", error.message)
  }

}

export async function getProjectById(projectId) {

  try {
    const project = await axios.get(
      `/projects/${projectId}`
    );
    return project.data.data.photos;

  } catch (error) {
    console.error("Помилка при завантаженні проекта:", error.message)
  }

}

export async function getReviews() {
  try {
    const projects = await axios.get(
      "/reviews"
    );
    return projects.data.data;

  } catch (error) {
    console.error("Помилка при завантаженні відгуків:", error.message)
  }
}