import { request, getToken } from "./api.js";

const getWorkers = () =>
  request("/api/labour/workers", {
    token: getToken()
  });

const createWorker = (payload) =>
  request("/api/labour/workers", {
    method: "POST",
    token: getToken(),
    body: payload
  });

const getAttendanceReport = () =>
  request("/api/labour/reports/attendance", {
    token: getToken()
  });

const getSalaryReport = () =>
  request("/api/labour/reports/salary", {
    token: getToken()
  });

export {
  getWorkers,
  createWorker,
  getAttendanceReport,
  getSalaryReport
};
