import { request, getToken } from "./api.js";

const getUsers = () =>
  request("/api/users", {
    token: getToken()
  });

const createUser = (payload) =>
  request("/api/users", {
    method: "POST",
    token: getToken(),
    body: payload
  });

const updateUser = (id, payload) =>
  request(`/api/users/${id}`, {
    method: "PUT",
    token: getToken(),
    body: payload
  });

const deleteUser = (id) =>
  request(`/api/users/${id}`, {
    method: "DELETE",
    token: getToken()
  });

export { getUsers, createUser, updateUser, deleteUser };
