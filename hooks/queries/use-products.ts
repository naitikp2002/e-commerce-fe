import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Product,
  ProductsResponse,
  ProductDetailsResponse,
} from "@/types/products";
import { getToken } from "@/lib/auth";
import api from "@/lib/axios";

// Query keys
export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (filters: string) => [...productKeys.lists(), { filters }] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
};

// Queries
export const useUserProducts = (
  page = 1,
  limit = 10,
  categoryFilter: number[] | null = null,
  brandFilter: number[] | null = null,
  priceRange: [number, number] | null = null,
  ratings: number | null = null,
  searchTerm: string = ""
) => {
  return useQuery({
    queryKey: [
      "products",
      page,
      categoryFilter,
      brandFilter,
      searchTerm,
      priceRange,
      ratings,
    ],
    queryFn: async () => {
      const token = getToken();
      const queryParams = new URLSearchParams();

      queryParams.append("page", page.toString());
      queryParams.append("limit", limit.toString());

      if (categoryFilter && categoryFilter.length > 0) {
        queryParams.append("category_id", categoryFilter.join(","));
      }

      if (brandFilter && brandFilter.length > 0) {
        queryParams.append("brand_id", brandFilter.join(","));
      }

      if (priceRange) {
        queryParams.append("price_range", priceRange.join(","));
      }

      if (ratings) {
        queryParams.append("ratings", ratings.toString());
      }

      if (searchTerm) {
        queryParams.append("search", searchTerm);
      }

      const response = await api.get(`/products/all?${queryParams.toString()}`);

      return response.data;
    },
  });
};

export const useProducts = (
  page = 1,
  limit = 10,
  categoryFilter: string | null = null,
  brandFilter: string | null = null,
  searchTerm: string = ""
) => {
  return useQuery({
    queryKey: ["products", page, categoryFilter, brandFilter, searchTerm],
    queryFn: async () => {
      const token = getToken();
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(categoryFilter && { category_id: categoryFilter }),
        ...(brandFilter && { brand_id: brandFilter }),
        ...(searchTerm && { search: searchTerm }),
      });

      const response = await api.get(`/products/all?${queryParams.toString()}`);

      return response.data;
    },
  });
};

export const useProduct = (id: number) => {
  return useQuery<ProductDetailsResponse, Error>({
    queryKey: productKeys.detail(id),
    queryFn: async () => {
      const token = getToken();

      try {
        const response = await api.get(`/products/${id}`);

        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch product");
      }
    },
  });
};

// Mutations
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const token = getToken();
      const { data } = await api.post("/products/add", formData);
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
      const response = await api.put(`/products/${id}`, data);
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
      const token = getToken();
      await api.delete(`/products/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
};
