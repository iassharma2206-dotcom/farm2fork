import api from "../api";

export const buyRequestAPI = {
  getAll: async () => {
    const res = await api.get("/buy-requests");
    return res.data;
  },

  create: async (data) => {
    const res = await api.post("/buy-requests", data);
    return res.data;
  },

  claim: async (id) => {
    const res = await api.post(`/buy-requests/${id}/claim`);
    return res.data;
  },
};

