import { ProductCard } from "@/components/common/productCard";
import React from "react";
import { Grid2 as Grid } from "@mui/material";
const page = () => {
  const product = {
    id: 3,
    name: "Mens jeans",
    description: "Denim jeans for mens",
    image: "https://via.placeholder.com/150",
    price: 100,
    rating: "4",
    stock: 100,
    brand: {
      id: 3,
      name: "Flying machine",
    },
    category: {
      id: 2,
      name: "Clothes",
    },
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3 p-3 items-center ">
        <ProductCard product={product} />
        <ProductCard product={product} />
        <ProductCard product={product} />
        <ProductCard product={product} />
        <ProductCard product={product} />
        <ProductCard product={product} />
        <ProductCard product={product} />
        <ProductCard product={product} />
        <ProductCard product={product} />
        <ProductCard product={product} />
      </div>
    </div>
  );
};

export default page;
