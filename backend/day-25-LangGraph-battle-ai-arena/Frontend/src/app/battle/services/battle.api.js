import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const setAIBattle = async (problem) => {
  try {
    const response = await api.post("/api/ai-battle", { problem });
    return response.data;
  } catch (error) {
    console.log("API Layer Error: ", error);
    throw error;
  }
};

