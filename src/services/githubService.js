import api from "./api";

export async function getGithubUser(username) {
  const response = await api.get(
    `https://api.github.com/users/${username}`
  );

  return response.data;
}