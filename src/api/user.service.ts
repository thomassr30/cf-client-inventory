import api from "@/lib/axios";
import { IUserResponse } from "interfaces/user.interface";

export class UserService {
  static getUserPagination = async (
    page: number,
    size: number,
    company: number,
    fireBrigade: number
  ): Promise<IUserResponse> => {
    try {
      const { data } = await api.get<IUserResponse>(
        `/user?page=${page}&perPage=${size}&numberCompany=${company}&fireBrigade=${fireBrigade}`
      );

      return data;
    } catch (error) {
      throw new Error("Error al obtener usuarios");
    }
  };
}
