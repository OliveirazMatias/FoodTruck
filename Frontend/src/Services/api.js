import http from "./http";

export const getLanches = async () => {
  try {
    const response = await http.get("/lanches");
    return response.data;
  } catch (error) {
    console.error("Error fetching lanches:", error);
    throw error;
  }
}

