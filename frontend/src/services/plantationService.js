import { request, getToken } from "./api.js";

const getPlantations = () =>
  request("/api/plantations", {
    token: getToken()
  });

const getPlantationPerformance = () =>
  request("/api/plantations/reports/performance", {
    token: getToken()
  });

const getDiseaseReport = () =>
  request("/api/plantations/reports/disease", {
    token: getToken()
  });

const getProductivityReport = () =>
  request("/api/plantations/reports/productivity", {
    token: getToken()
  });

export {
  getPlantations,
  getPlantationPerformance,
  getDiseaseReport,
  getProductivityReport
};
