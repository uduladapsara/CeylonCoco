import { request, getToken } from "./api.js";

const getProducts = (query = "") =>
  request(`/api/sales/products${query}`, {});

const getProductById = (id) =>
  request(`/api/sales/products/${id}`);

const createProduct = (payload) =>
  request("/api/sales/products", {
    method: "POST",
    token: getToken(),
    body: payload
  });

const getOrders = (query = "") =>
  request(`/api/sales/orders${query}`, {
    token: getToken()
  });

const createOrder = (payload) =>
  request("/api/sales/orders", {
    method: "POST",
    token: getToken(),
    body: payload
  });

const getCart = (customerId) =>
  request(`/api/sales/cart?customerId=${customerId}`, {
    token: getToken()
  });

const updateCart = (payload) =>
  request("/api/sales/cart", {
    method: "PUT",
    token: getToken(),
    body: payload
  });

const checkoutCart = (payload) =>
  request("/api/sales/cart/checkout", {
    method: "POST",
    token: getToken(),
    body: payload
  });

export {
  getProducts,
  getProductById,
  createProduct,
  getOrders,
  createOrder,
  getCart,
  updateCart,
  checkoutCart
};
