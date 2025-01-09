import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-service";
import { getToken } from "@/lib/auth";
import axios from "axios";
import { CartPayload } from "@/types/cart";
import { toast } from "sonner";
import { productKeys } from "./use-products";
import api from "@/lib/axios";
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
      const response = await api.get("/favourites"); // Using the `api` instance
      return response.data; // Axios handles JSON parsing
    },
  });
};


export const useUpdateFavourites = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ ...data }: CartPayload) => {
      const response = await api.put(
        `/favourites`,
        data,
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
