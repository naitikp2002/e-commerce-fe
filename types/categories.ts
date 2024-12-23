export interface Category {
  id: number
  name: string
  // Add any other category-specific fields you need
}

export interface CategoriesResponse {
  categories: Category[]
  // Add any pagination or metadata fields if needed
} 