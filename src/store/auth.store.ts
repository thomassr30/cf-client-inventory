import { AuthService } from "@/api/auth.service";
import { AuthStatus } from "interfaces";
import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthState {
  access_token?: string;
  id?: number;
  email?: string;
  role?: string;
  numberCompany?: number;
  fireBrigade?: number;
  status: AuthStatus;

  loginUser: (email: string, password: string) => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  logoutUser: () => void;
}

const storeApi: StateCreator<AuthState> = (set) => ({
  status: "pending",
  access_token: undefined,
  id: undefined,
  email: undefined,
  role: undefined,
  numberCompany: undefined,
  fireBrigade: undefined,

  loginUser: async (email: string, password: string) => {
    try {
      const { access_token, data } = await AuthService.login(email, password);
      set({
        status: "authorized",
        access_token,
        id: data.id,
        email: data.email,
        role: data.role,
        numberCompany: data.numberCompany,
        fireBrigade: data.fireBrigade,
      });
    } catch (error) {
      set({
        status: "unauthorized",
        access_token: undefined,
        id: undefined,
        email: undefined,
        role: undefined,
        numberCompany: undefined,
        fireBrigade: undefined,
      });
    }
  },
  checkAuthStatus: async () => {
    try {
      const { access_token, data } = await AuthService.checkStatus();
      set({
        status: "authorized",
        access_token,
        id: data.id,
        email: data.email,
        role: data.role,
        numberCompany: data.numberCompany,
        fireBrigade: data.fireBrigade,
      });
    } catch (error) {
      set({
        status: "unauthorized",
        access_token: undefined,
        id: undefined,
        email: undefined,
        role: undefined,
        numberCompany: undefined,
        fireBrigade: undefined,
      });
    }
  },
  logoutUser: () => {
    set({
      status: "unauthorized",
      access_token: undefined,
      id: undefined,
      email: undefined,
      role: undefined,
      numberCompany: undefined,
      fireBrigade: undefined,
    });
  },
});

export const useAuthStore = create<AuthState>()(
  persist(storeApi, { name: "auth-store" })
);
