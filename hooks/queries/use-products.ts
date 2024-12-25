import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-service";
import {
  Product,
  ProductsResponse,
  ProductDetailsResponse,
} from "@/types/products";
import { getToken } from "@/lib/auth";

// Query keys
export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (filters: string) => [...productKeys.lists(), { filters }] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
};

// Queries
export const useProducts = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['products', page],
    queryFn: async () => {
      const token = getToken();
      const response = await fetch(`http://localhost:8080/api/products/all?page=${page}&limit=${limit}`,{
        headers: {
          Authorization: `${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: async () => {
      const token = getToken();
      const response = await fetch(`http://localhost:8080/api/products/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      const data = await response.json();
      return data as ProductDetailsResponse;
    },
  });
};

// Mutations
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const token = getToken();
      const { data } = await apiClient.post("/products/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${token}`,
        },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: FormData }) => {
      const token = getToken();
      const response = await apiClient.put(`/products/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${token}`,
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: productKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete(`/products/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
};
