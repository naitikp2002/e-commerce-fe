export type Brand = {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}

export type Category = {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}

export type Product = {
  id: number
  name: string
  description: string
  price: number
  image: string
  rating: string
  stock: number
  brand_id: number
  category_id: number
  createdAt: string
  updatedAt: string
  brand: Brand
  category: Category
}

export type ProductsResponse = {
  message: string
  products: Product[]
}

