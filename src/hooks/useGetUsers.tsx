import { UserService } from "@/api/user.service";
import { useQuery } from "@tanstack/react-query";
import { IUserResponse } from "../interfaces/user.interface";

const getUserPagination = async (
  page: number,
  size: number,
  company: number,
  fireBrigade: number
): Promise<IUserResponse> => {
  const data = await UserService.getUserPagination(
    page,
    size,
    company,
    fireBrigade
  );

  return data;
};

export const useGetUsers = () => {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: () => getUserPagination(0, 10, 2, 4),
  });

  return query;
};
