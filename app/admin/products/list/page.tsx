"use client";

import { useProducts } from "@/hooks/queries/use-products";
import { ProductCard } from "@/components/common/productCard";
import { Product } from "@/types/products";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { SkeletonCard } from "@/components/common/SkeletonCard";
import { Pagination } from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

const ProductListPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useProducts(page, 10);

  const user = useSelector((state: RootState) => state.user.user);
  const token = useSelector((state: RootState) => state.user.token);
  // console.log("Providers",user);
  

  if (isLoading)
    return (
      <div className="flex flex-wrap gap-5 p-3 items-center">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  if (error) return <div>Error loading products</div>;

  return (
    <div className="p-6 w-[75vw]">
      <div className="w-[100%] flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button onClick={() => router.push("/admin/products/create")}>
          Add New Product
        </Button>
      </div>
      <div className="flex flex-wrap gap-3 p-3 items-center">
        {data?.products?.map((product: Product) => (
          <div
            key={product.id}
            onClick={() => router.push(`/admin/products/${product.id}`)}
            className="cursor-pointer"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex justify-center">
        <Pagination
          currentPage={page}
          totalPages={data?.totalPages || 1}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
};

export default ProductListPage;
