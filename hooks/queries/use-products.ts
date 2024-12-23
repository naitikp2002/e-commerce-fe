import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/lib/api-service"
import { Product, ProductsResponse } from "@/types/products"
import { getToken } from "@/lib/auth"


// Query keys
export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (filters: string) => [...productKeys.lists(), { filters }] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
}

// Queries
export const useProducts = (filters?: string) => {
  return useQuery({
    queryKey: productKeys.list(filters ?? ""),
    queryFn: async () => {
      const token = getToken()
      const response = await fetch("http://localhost:8080/api/products/all", {
        headers: {
          Authorization: `${token}`,
        },
      })
      if (!response.ok) {
        throw new Error("Failed to fetch products")
      }
      return response.json()
    },
  })
}

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: async () => {
      const { data } = await apiClient.get(`/products/${id}`)
      return data as Product
    },
  })
}

// Mutations
export const useCreateProduct = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (newProduct: Omit<Product, "id">) => {
      const { data } = await apiClient.post("/products/create", newProduct)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() })
    },
  })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id, ...data }: Product) => {
      const response = await apiClient.put(`/products/${id}`, data)
      return response.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: productKeys.detail(data.id) })
      queryClient.invalidateQueries({ queryKey: productKeys.lists() })
    },
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete(`/products/${id}`)
      return id
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() })
    },
  })
} 