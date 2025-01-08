import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-service";
import { Brand } from "@/types/products";
import { getToken } from "@/lib/auth";
import axios from "axios";
import { CartPayload } from "@/types/cart";
import { toast } from "sonner";
// Query keys
export const cardKey: {
  all: readonly string[];
  lists: () => readonly string[];
  list: () => readonly string[];
  details: () => readonly string[];
  detail: (id: number) => readonly (string | number)[];
} = {
  all: ["savedCards"] as const,
  lists: () => [...cardKey.all, "list"] as const,
  list: () => [...cardKey.lists()] as const,
  details: () => [...cardKey.all, "detail"] as const,
  detail: (id: number) => [...cardKey.details(), id] as const,
};

export const useAddtoSaveCard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      try {
        const response = await axios.post(
          `http://localhost:8080/api/payment/create-setup-intent`,
          {},
          {
            headers: {
              Authorization: getToken(),
            },
          }
        );
        toast.success("Card Saved successfully");
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An unknown error occurred.");
        }
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cardKey.list() });
    },
  });
};

export const useGetSavedCards = () => {
  return useQuery({
    queryKey: cardKey.list(),
    queryFn: async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/payment/get-saved-cards`,
          {
            headers: {
              Authorization: getToken(),
            },
          }
        );
        toast.success("Card fetched successfully");
        return response.data?.paymentMethods?.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An unknown error occurred.");
        }
        throw error;
      }
    },
  });
};
