import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-service";
import { User } from "@/types/users";
import { getToken } from "@/lib/auth";
import api from "@/lib/axios";

const userKeys = {
  all: ["users"] as const,
  list: (page: number, pageSize: number) => ["users", page, pageSize] as const,
  details: (id: number) => ["user", id] as const,
};

export const useUsers = (page: number, pageSize: number) => {
  const token = getToken();
  return useQuery({
    queryKey: userKeys.list(page, pageSize),
    queryFn: () =>
      api.get(`/users/all?page=${page}&limit=${pageSize}`, {
        headers: {
          Authorization: token,
        },
      }),
  });
};

export const useUserDetails = (id: number) => {
  const token = getToken();
  return useQuery({
    queryKey: userKeys.details(id),
    queryFn: () =>
      api.get(`/users/${id}`, {
        headers: {
          Authorization: token,
        },
      }),
  });
};
