import api from "@/lib/axios";
import { AxiosError } from "axios";
import { LoginResponse } from "interfaces/loginResponse.interface";

export class AuthService {
  static login = async (
    email: string,
    password: string
  ): Promise<LoginResponse> => {
    try {
      const { data } = await api.post<LoginResponse>("/auth/login", {
        email,
        password,
      });
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error, "here");
        throw new Error(error.response?.data);
      }

      throw new Error("unable to login");
    }
  };

  static checkStatus = async (): Promise<LoginResponse> => {
    try {
      const { data } = await api.get<LoginResponse>("auth/check-status");
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }

      throw new Error("unable to login");
    }
  };

  static register = async (newUser: any): Promise<any> => {
    try {
      const { data } = await api.post("/auth/register", newUser);
      console.log(data);
    } catch (error) {
      throw new Error("Error al crear usuario");
    }
  };
}
