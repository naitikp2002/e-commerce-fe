"use client"
import React from "react";
import { useProduct } from "../../../../hooks/queries/use-products";
import { ProductCard } from "@/components/common/productCard";
import ProductDetails from "@/components/common/ProductDetails";

const Productinfo = ({ params }: { params: { id: number } }) => {
  const { id } = params;
  const { data: product, isLoading } = useProduct(id);
  if (isLoading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;
  return <div>
    <ProductDetails product={product?.product} />
  </div>;
};

export default Productinfo;
