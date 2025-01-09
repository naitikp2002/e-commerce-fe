import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-service";
import { Brand } from "@/types/products";
import { getToken } from "@/lib/auth";
import axios from "axios";
import { CartPayload } from "@/types/cart";
import { toast } from "sonner";
import api from "@/lib/axios";
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
      const response = await api.get("/cart/all"); // Using the `api` instance
      return response.data; // Axios automatically parses JSON
    },
  });
};

export const useCartDetails = () => {
  return useQuery({
    queryKey: cartKeys.list(),
    queryFn: async () => {
      const response = await api.get("/cart"); // Use the axios instance
      return response.data; // Axios automatically parses JSON
    },
  });
};

// export const useCartDetails = () => {
//   return useQuery({
//     queryKey: cartKeys.list(),
//     queryFn: async () => {
//       const token = getToken();
//       const response = await fetch("http://localhost:8080/api/cart", {
//         headers: {
//           Authorization: `${token}`,
//         },
//       });
//       if (!response.ok) {
//         throw new Error("Failed to fetch categories");
//       }
//       return response.json();
//     },
//   });
// };


export const useUpdateCartDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CartPayload) => {
      const response = await api.put(`/cart`, data); // `api` handles headers and baseURL
      return response.data;
    },
    onSuccess: (data) => {
      // Invalidate specific queries
      queryClient.invalidateQueries({ queryKey: cartKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: cartKeys.list() });

      // Notify the user
      toast.success(data.message || "Cart updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating cart:", error);
      toast.error("Failed to update cart.");
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
