import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-service";
import { Brand } from "@/types/products";
import { getToken } from "@/lib/auth";
import axios from "axios";
import { AddressForm, CartPayload } from "@/types/cart";
import { toast } from "sonner";
// Query keys
export const addressKeys = {
  all: ["address"] as const,
  lists: () => [...addressKeys.all, "list"] as const,
  list: () => [...addressKeys.lists()] as const,
  details: () => [...addressKeys.all, "detail"] as const,
  detail: (id: number) => [...addressKeys.details(), id] as const,
};

// Queries
export const useGetAddress = () => {
  return useQuery({
    queryKey: addressKeys.list(),
    queryFn: async () => {
      const token = getToken();
      const response = await fetch("http://localhost:8080/api/address", {
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

interface Address {
  id: number;
  name: string;
  email: string;
  street_address: string;
  city: string;
  zip_code: string;
  country: string;
}

interface GetAddressByIdResponse {
  message: string;
  address: Address;
}

export const useGetAddressById = (id: number) => {
  return useQuery<GetAddressByIdResponse, Error>({
    queryKey: addressKeys.detail(id),
    queryFn: async (): Promise<GetAddressByIdResponse> => {
      const token = getToken();
      const response = await fetch(`http://localhost:8080/api/address/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch address");
      }
      return response.json();
    },
  });
};

export const useAddAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ ...data }: AddressForm) => {
      const response = await apiClient.post(
        `http://localhost:8080/api/address`,
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
      queryClient.invalidateQueries({ queryKey: addressKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: addressKeys.lists() });
      toast.success(data?.message);
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
      queryClient.invalidateQueries({ queryKey: addressKeys.lists() });
    },
  });
};
