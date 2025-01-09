import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Brand } from "@/types/products";
import { getToken } from "@/lib/auth";
import axios from "axios";
import api from "@/lib/axios";

// Query keys
export const brandKeys = {
  all: ["brands"] as const,
  lists: () => [...brandKeys.all, "list"] as const,
  list: (filters: string) => [...brandKeys.lists(), { filters }] as const,
  details: () => [...brandKeys.all, "detail"] as const,
  detail: (id: number) => [...brandKeys.details(), id] as const,
};

// Queries
export const useBrands = (filters?: string) => {
  return useQuery({
    queryKey: brandKeys.list(filters ?? ""),
    queryFn: async () => {
      const response = await api.get(
        `/brands/all${filters ? `?${filters}` : ""}`
      ); // Using the `api` instance
      return response.data; // Axios handles JSON parsing
    },
  });
};

// Mutations
export const useCreateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      newBrand: Omit<Brand, "id" | "createdAt" | "updatedAt">
    ) => {
      const token = getToken();
      const { data } = await api.post("/brands/add", newBrand);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: brandKeys.lists() });
    },
  });
};

export const useUpdateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: Brand) => {
      const response = await api.put(`/brands/${id}`, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: brandKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: brandKeys.lists() });
    },
  });
};

export const useDeleteBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/brands/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: brandKeys.lists() });
    },
  });
};

// export const useBrands = () => {
//   return useQuery({
//     queryKey: ["brands"],
//     queryFn: async () => {
//       const token = getToken();
//       const { data } = await axios.get("http://localhost:8080/api/brands/all", {
//         headers: {
//           Authorization: `${token}`,
//         },
//       });
//       return data;
//     },
//   });
// };

// export const useDeleteBrand = () => {
//   const queryClient = useQueryClient();
//   const token = getToken();
//   return useMutation({
//     mutationFn: (id: number) =>
//       axios.delete(`http://localhost:8080/api/brands/${id}`, {
//         headers: {
//           Authorization: `${token}`,
//         },
//       }),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["brands"] });
//     },
//   });
// };

export const useBrand = (id: number) => {
  return useQuery({
    queryKey: brandKeys.detail(id),
    queryFn: async () => {
      const { data } = await api.get(
        `/api/brands/${id}`
      );
      return data as Brand;
    },
  });
};
