"use client";
import React, { useState } from "react";
import { ProductCard } from "@/components/common/productCard";

import { useUserProducts } from "../../../hooks/queries/use-products";
import { Product } from "@/types/products";
import { Pagination } from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
const Products = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const priceRange = useSelector((state: RootState) => state.filter.priceRange);
  const selectedRating = useSelector(
    (state: RootState) => state.filter.ratings
  );
  const selectedCategories = useSelector(
    (state: RootState) => state.filter.categorries
  );
  const selectedBrands = useSelector((state: RootState) => state.filter.brands);
  const [page, setPage] = useState(1);
  const { data: products, isLoading } = useUserProducts(
    page,
    10,
    selectedCategories,
    selectedBrands,
    priceRange,
    selectedRating
  );
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <div className="p-6">
        <div className="w-[100%] flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Products</h1>
        </div>
        <div className="flex flex-wrap gap-6 p-3 items-center justify-center">
          {products?.products?.map((product: Product, index: number) => (
            <div
              className="cursor-pointer"
              key={index}
              onClick={() => router.push(`/products/${product.id}`)}
            >
              <ProductCard key={index} product={product} />
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Pagination
            currentPage={products?.currentPage}
            totalPages={products?.totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      </div>
    </>
  );
};

export default Products;
