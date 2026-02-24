import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/posts",
  withCredentials: true,
});

export async function showFeed() {
  try {
    const response = await api.get("/feed");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
