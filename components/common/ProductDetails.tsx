import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { Product } from "@/types/products";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ProductDetailsProps {
  product: {
    id: number;
    images: string[];
    name: string;
    description: string;
    price: number;
    rating: string;
    stock: number;
    brand: {
      id: number;
      name: string;
    };
    category: {
      id: number;
      name: string;
    };
  };
  isAdmin?: boolean;
}

const ProductDetails = ({ product, isAdmin = false }: ProductDetailsProps) => {
  const [selectedImage, setSelectedImage] = useState(product?.images?.[0]);
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images Section */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative h-96 w-full">
            <Image
              src={selectedImage || product?.images?.[0]}
              alt={product?.name}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Thumbnail Images */}
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {product?.images?.map((image, index) => (
              <div
                key={index}
                className="relative h-20 w-20 flex-shrink-0 cursor-pointer border-2 rounded-md transition-all duration-200 hover:border-blue-500"
                onMouseEnter={() => setSelectedImage(image)}
              >
                <Image
                  src={image}
                  alt={`${product?.name} - Image ${index + 1}`}
                  fill
                  className="object-contain p-1"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold">{product?.name}</h1>

          <div className="flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  className={`h-5 w-5 ${
                    index < parseInt(product?.rating)
                      ? "text-yellow-400"
                      : "text-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              {product?.rating} out of 5
            </span>
          </div>

          <div className="border-t border-b py-4">
            <div className="text-2xl font-bold">
              ${product?.price?.toFixed(2)}
            </div>
          </div>

          <div>
            <h2 className="font-semibold">About this item:</h2>
            <p className="text-gray-600 mt-2">{product?.description}</p>
          </div>

          <div className="space-y-2">
            <div className="flex">
              <span className="font-semibold w-24">Brand:</span>
              <span>{product?.brand?.name}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-24">Category:</span>
              <span>{product?.category?.name}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-24">Stock:</span>
              <span
                className={
                  product?.stock > 0 ? "text-green-600" : "text-red-600"
                }
              >
                {product?.stock > 0
                  ? `${product?.stock} in stock`
                  : "Out of stock"}
              </span>
            </div>
          </div>

          {!isAdmin && (
            <button
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors w-full md:w-auto"
              disabled={product?.stock === 0}
            >
              Add to Cart
            </button>
          )}
          {isAdmin && (
            <button
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors w-full md:w-auto"
              onClick={() => router.push(`/admin/products/${product?.id}/edit`)}
            >
              Edit Product Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
