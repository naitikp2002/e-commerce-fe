import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/lib/api-service"
import { Category } from "@/types/categories"  // You'll need to create this type
import { getToken } from "@/lib/auth"

// Query keys
export const categoryKeys = {
  all: ["categories"] as const,
  lists: () => [...categoryKeys.all, "list"] as const,
  list: (filters: string) => [...categoryKeys.lists(), { filters }] as const,
  details: () => [...categoryKeys.all, "detail"] as const,
  detail: (id: number) => [...categoryKeys.details(), id] as const,
}

// Queries
export const useCategories = (filters?: string) => {
  return useQuery({
    queryKey: categoryKeys.list(filters ?? ""),
    queryFn: async () => {
      const token = getToken()
      const response = await fetch("http://localhost:8080/api/categories/all", {
        headers: {
          Authorization: `${token}`,
        },
      })
      if (!response.ok) {
        throw new Error("Failed to fetch categories")
      }
      return response.json()
    },
  })
}

export const useCategory = (id: number) => {
  return useQuery({
    queryKey: categoryKeys.detail(id),
    queryFn: async () => {
      const { data } = await apiClient.get(`/categories/${id}`)
      return data as Category
    },
  })
}

// Mutations
export const useCreateCategory = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (newCategory: Omit<Category, "id">) => {
      const token = getToken()
      const { data } = await apiClient.post("/categories/add", newCategory, {
        headers: {
          Authorization: `${token}`,
        },
      })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() })
    },
  })
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id, ...data }: Category) => {
      const response = await apiClient.put(`/categories/${id}`, data)
      return response.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.detail(data.id) })
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() })
    },
  })
}

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete(`/categories/${id}`)
      return id
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() })
    },
  })
} 