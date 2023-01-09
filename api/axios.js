import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
  },
});

// refresh token
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = queryClient.getQueryData("refreshToken");
      const { data } = await axios.post("/auth/refresh", {
        refreshToken,
      });
      queryClient.setQueryData("accessToken", data.accessToken);
      queryClient.setQueryData("refreshToken", data.refreshToken);
      instance.defaults.headers["Authorization"] = `Bearer ${data.accessToken}`;
      return instance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default instance;
