import { request, getToken } from "./api.js";

const getIncome = () =>
  request("/api/finance/income", {
    token: getToken()
  });

const createIncome = (payload) =>
  request("/api/finance/income", {
    method: "POST",
    token: getToken(),
    body: payload
  });

const getExpenses = () =>
  request("/api/finance/expenses", {
    token: getToken()
  });

const createExpense = (payload) =>
  request("/api/finance/expenses", {
    method: "POST",
    token: getToken(),
    body: payload
  });

const getProfitLoss = () =>
  request("/api/finance/reports/profit-loss", {
    token: getToken()
  });

const getRevenueReport = () =>
  request("/api/finance/reports/revenue", {
    token: getToken()
  });

const getExpenseReport = () =>
  request("/api/finance/reports/expense", {
    token: getToken()
  });

export {
  getIncome,
  createIncome,
  getExpenses,
  createExpense,
  getProfitLoss,
  getRevenueReport,
  getExpenseReport
};
