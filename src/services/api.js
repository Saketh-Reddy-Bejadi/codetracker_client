import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
  },
});

export const fetchUsers = async (batch) => {
  try {
    const response = await api.get(`/api/leaderboard/${batch}`);
    return {
      users: response.data.users || [],
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const fetchScrapingStats = async (batch) => {
  try {
    const response = await api.get(`/api/scraping/stats/${batch}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching scraping stats:", error);
    throw error;
  }
};

export const updateHandles = (batch, handles) =>
  api.post(`/api/users/${batch}/update-handles`, { handles });

export const fetchDashboardData = async (batch, token) => {
  try {
    const response = await api.get(`/api/dashboard/${batch}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};