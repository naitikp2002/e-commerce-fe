import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-service";
import { getToken } from "@/lib/auth";
import axios from "axios";
import { CartPayload } from "@/types/cart";
import { toast } from "sonner";
import { productKeys } from "./use-products";
// Query keys
export const favouritesKeys = {
  all: ["favourites"] as const,
  lists: () => [...favouritesKeys.all, "list"] as const,
  list: () => [...favouritesKeys.lists()] as const,
  details: () => [...favouritesKeys.all, "detail"] as const,
  detail: (id: number) => [...favouritesKeys.details(), id] as const,
};

// Queries

export const useFavouritesProducts = () => {
  return useQuery({
    queryKey: favouritesKeys.list(),
    queryFn: async () => {
      const token = getToken();
      const response = await fetch("http://localhost:8080/api/favourites", {
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

export const useUpdateFavourites = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ ...data }: CartPayload) => {
      const response = await apiClient.put(
        `http://localhost:8080/api/favourites`,
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
      queryClient.invalidateQueries({ queryKey: favouritesKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: favouritesKeys.lists() });
      queryClient.invalidateQueries({ queryKey: productKeys.all });

      toast.success(data.message)
    },
  });
};
