import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../utils/axiosInstance";

export const useLoginStore = create(
  persist(
    (set, get) => ({
      loginUser: null,
      loading: false,
      error: null,
      // REGISTER
      registerUser: async (data) => {
        try {
          set({ loading: true, error: null });
          const response = await axiosInstance("auth/register", data);
          set({ loading: false });
          return response;
        } catch (error) {
          const message =
            error?.response?.data?.message ||
            error?.message ||
            "Something went wrong";
          set({
            loading: false,
            error: message,
          });
          return null;
        }
      },
      // LOGIN FLOW
      login: async (credentials) => {
        try {
          set({ loading: true, error: null });
          const response = await axiosInstance("auth/login", credentials);
          const data = response?.data?.data;
          set({ loading: false, loginUser: data });
          return response;
        } catch (error) {
          const message =
            error?.response?.data?.message ||
            error?.message ||
            "Something went wrong";
          set({
            loading: false,
            error: message,
          });
          return null;
        }
      },
      // LOGOUT FLOW
      logout: async () => {
        try {
          set({ loading: true, error: null });
          const response = await axiosInstance("auth/logout", {});
          set({ loading: false, loginUser: null });
          localStorage.removeItem("User");
          return response;
        } catch (error) {
          const message =
            error?.response?.data?.message ||
            error?.message ||
            "Something went wrong";
          set({
            loading: false,
            error: message,
          });
          return null;
        }
      },
    }),
    {
      name: "User",
      partialize: (state) => ({ user: state.loginUser }),
    },
  ),
);
