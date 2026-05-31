import { request, getToken } from "./api.js";

const getTasks = () =>
  request("/api/tasks", {
    token: getToken()
  });

const createTask = (payload) =>
  request("/api/tasks", {
    method: "POST",
    token: getToken(),
    body: payload
  });

const updateTask = (id, payload) =>
  request(`/api/tasks/${id}`, {
    method: "PUT",
    token: getToken(),
    body: payload
  });

export { getTasks, createTask, updateTask };
