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
  images: string[]
  rating: string
  favourite: boolean
  stock: number
  brand_id: number
  category_id: number
  createdAt: string
  updatedAt: string
  brand: Brand
  category: Category
}

export type ProductwithImagesURL = {
  id: number
  name: string
  description: string
  price: number
  images: string
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

export type ProductDetailsResponse = {
  message: string
  product: Product
}
