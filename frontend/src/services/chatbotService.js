import { request, getToken } from "./api.js";

const askQuestion = (question) =>
  request("/api/chatbot/ask", {
    method: "POST",
    token: getToken(),
    body: { question }
  });

const getHistory = () =>
  request("/api/chatbot/history", {
    token: getToken()
  });

export { askQuestion, getHistory };
