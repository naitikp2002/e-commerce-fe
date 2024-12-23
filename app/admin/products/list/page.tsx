"use client"

import { useProducts } from "@/hooks/queries/use-products"
import { ProductCard } from "@/components/common/productCard"
import { Product } from "@/types/products"

const ProductListPage = () => {
  const { data: products, isLoading, error } = useProducts()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading products</div>

  return (
    <div>
      <div className="flex flex-wrap gap-3 p-3 items-center">
        {products?.products?.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default ProductListPage
