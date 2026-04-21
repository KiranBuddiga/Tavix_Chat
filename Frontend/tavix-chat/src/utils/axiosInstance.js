import api from "./apiHelper";

const axiosInstance = async (url, data) => {
  try {
    const response = await api.post(url, data);
    return response;
  } catch (error) {
    const errorStatus = error?.response?.status;
    if (errorStatus === 401) {
      localStorage.removeItem("User");
      window.location.href = "/";
    }
  }
};

export default axiosInstance;
