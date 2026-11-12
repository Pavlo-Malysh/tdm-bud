import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

axios.defaults.baseURL = API_URL

export async function getProjects() {
  const projects = await axios.get(
    "/projects"
  );
  return projects.data.data;
}

export async function getProjectById(projectId) {
  const project = await axios.get(
    `/projects/${projectId}`
  );
  return project.data.data.photos;

}

export async function getReviews() {
  const projects = await axios.get(
    "/reviews"
  );
  return projects.data.data;

}

export async function postLead(lead) {
  const res = await axios.post("/leads", lead);
  return res.data

}