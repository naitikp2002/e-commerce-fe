import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Brand } from "@/types/products";
import { getToken } from "@/lib/auth";
import axios from "axios";
import { AddressForm, CartPayload } from "@/types/cart";
import { toast } from "sonner";
import api from "@/lib/axios";
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
      const response = await api.get("/address"); // Using the `api` instance
      return response.data; // Axios handles JSON parsing
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
      const response = await api.get(`/address/${id}`); // Use the `api` instance
      return response.data; // Axios automatically parses JSON
    },
  });
};

export const useAddAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ ...data }: AddressForm) => {
      const response = await api.post(`/address`, data);
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
      await api.delete(`/brands/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: addressKeys.lists() });
    },
  });
};
