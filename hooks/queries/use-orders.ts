import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-service";
import { Brand } from "@/types/products";
import { getToken } from "@/lib/auth";
import axios from "axios";

// Query keys
export const orderKeys = {
  all: ["orders"] as const,
  lists: () => [...orderKeys.all, "list"] as const,
  list: (filters: string) => [...orderKeys.lists(), { filters }] as const,
  details: () => [...orderKeys.all, "detail"] as const,
  detail: (id: number) => [...orderKeys.details(), id] as const,
};

// Queries
export const useAllOrders = (filters?: string) => {
  return useQuery({
    queryKey: orderKeys.list(filters ?? ""),
    queryFn: async () => {
      const token = getToken();
      const response = await fetch("http://localhost:8080/api/orders/all", {
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

export const useAdminAllOrders = (
  page = 1,
  limit = 10,
  sortTerm = "id",
  sortDirection = "asc",
  searchTerm: string = ""
) => {
  return useQuery({
    queryKey: ["orders", page, limit, sortTerm, sortDirection, searchTerm],
    queryFn: async () => {
      const token = getToken();
      const queryParams = new URLSearchParams();

      queryParams.append("page", page.toString());
      queryParams.append("limit", limit.toString());

      if (sortTerm) {
        queryParams.append("sort_term", sortTerm);
      }

      if (sortDirection) {
        queryParams.append("direction", sortDirection);
      }
  
      if (searchTerm) {
        queryParams.append("search", searchTerm);
      }
      const response = await fetch(
        `http://localhost:8080/api/orders/admin/all?${queryParams.toString()}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      return response.json();
    },
  });
};

export const useOrders = (id?: string) => {
  return useQuery({
    queryKey: orderKeys.list(id ?? ""),
    queryFn: async () => {
      const token = getToken();

      const response = await fetch(`http://localhost:8080/api/orders/${id}`, {
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

export const useGetOrdersDetails = (id?: string) => {
  return useQuery({
    queryKey: orderKeys.list(id ?? ""),
    queryFn: async () => {
      const token = getToken();

      const response = await fetch(
        `http://localhost:8080/api/order-details/${id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      return response.json();
    },
  });
};

export const useUpdateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: Brand) => {
      const response = await apiClient.put(
        `http://localhost:8080/api/brands/${id}`,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    },
  });
};
