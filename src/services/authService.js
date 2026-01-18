import api from "../api";

// Signup
export const signup = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data.data; // 👈 IMPORTANT
};

// Login
export const login = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data.data; // 👈 IMPORTANT
};
