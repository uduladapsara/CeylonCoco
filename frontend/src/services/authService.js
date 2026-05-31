import { request } from "./api.js";

const login = (payload) =>
  request("/api/auth/login", {
    method: "POST",
    body: payload
  });

const register = (payload) =>
  request("/api/auth/register", {
    method: "POST",
    body: payload
  });

const getProfile = (token) =>
  request("/api/auth/profile", {
    token
  });

export { login, register, getProfile };
