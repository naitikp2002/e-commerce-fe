"use client"
import React from "react";
import { ProductCard } from "@/components/common/productCard";

import { useProducts } from "../../../hooks/queries/use-products";
import { Product } from "@/types/products";
const Products = () => {
  const { data: products, isLoading } = useProducts(1, 10);
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <div className="p-6">
        <div className="w-[100%] flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Products</h1>
        </div>
        <div className="flex flex-wrap gap-6 p-3 items-center justify-center">

          {products?.products?.map((product: Product, index: number) => (<>
            <ProductCard key={index} product={product} />
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
