import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-service";
import { Brand } from "@/types/products";
import { getToken } from "@/lib/auth";
import axios from "axios";
import { CartPayload } from "@/types/cart";
import { toast } from "sonner";
// Query keys
export const cartKeys = {
  all: ["cart"] as const,
  lists: () => [...cartKeys.all, "list"] as const,
  list: () => [...cartKeys.lists()] as const,
  details: () => [...cartKeys.all, "detail"] as const,
  detail: (id: number) => [...cartKeys.details(), id] as const,
};

// Queries
export const useAllCartDetails = () => {
  return useQuery({
    queryKey: cartKeys.list(),
    queryFn: async () => {
      const token = getToken();
      const response = await fetch("http://localhost:8080/api/cart/all", {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      return response.json();
    },
  });
};

export const useCartDetails = () => {
  return useQuery({
    queryKey: cartKeys.list(),
    queryFn: async () => {
      const token = getToken();
      const response = await fetch("http://localhost:8080/api/cart", {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      return response.json();
    },
  });
};

export const useUpdateCartDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ ...data }: CartPayload) => {
      const response = await apiClient.put(
        `http://localhost:8080/api/cart`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${getToken()}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: cartKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: cartKeys.lists() });
      toast.success(data.message)
    },
  });
};

export const useDeleteBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete(`/brands/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.lists() });
    },
  });
};

export const useBrand = (id: number) => {
  return useQuery({
    queryKey: cartKeys.detail(id),
    queryFn: async () => {
      const { data } = await apiClient.get(
        `http://localhost:8080/api/brands/${id}`
      );
      return data as Brand;
    },
  });
};
