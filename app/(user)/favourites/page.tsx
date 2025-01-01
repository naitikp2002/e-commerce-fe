"use client";
import { ProductCard } from "@/components/common/productCard";
import { useFavouritesProducts } from "@/hooks/queries/use-favourites";
import { Product } from "@/types/products";
import React from "react";

const FavouritesList = () => {
  const { data: products, isLoading } = useFavouritesProducts();
  if(isLoading) return <div>Loading...</div>
  return (
    <div className="p-6">
      <div className="w-[100%] flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
      </div>
      <div className="flex flex-wrap gap-6 p-3 items-center justify-center">
        {products?.products?.map((product: Product, index: number) => (
          //  <div className="cursor-pointer" key={index} onClick={() => router.push(`/products/${product.id}`)}>
          <ProductCard key={index} product={product} />
          //  </div>
        ))}
      </div>
      <div className="flex justify-center"></div>
    </div>
  );
};

export default FavouritesList;
