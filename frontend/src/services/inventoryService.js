import { request, getToken } from "./api.js";

const getInventory = () =>
  request("/api/inventory", {
    token: getToken()
  });

const createItem = (payload) =>
  request("/api/inventory", {
    method: "POST",
    token: getToken(),
    body: payload
  });

const updateItem = (id, payload) =>
  request(`/api/inventory/${id}`, {
    method: "PUT",
    token: getToken(),
    body: payload
  });

const deleteItem = (id) =>
  request(`/api/inventory/${id}`, {
    method: "DELETE",
    token: getToken()
  });

const getSummary = () =>
  request("/api/inventory/reports/summary", {
    token: getToken()
  });

const getLowStock = () =>
  request("/api/inventory/reports/low-stock", {
    token: getToken()
  });

const getWarehouseReport = () =>
  request("/api/inventory/reports/warehouse", {
    token: getToken()
  });

export {
  getInventory,
  createItem,
  updateItem,
  deleteItem,
  getSummary,
  getLowStock,
  getWarehouseReport
};
