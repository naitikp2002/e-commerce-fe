"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Trash2 } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import { useProducts } from "@/hooks/queries/use-products";
import { Product } from "@/types/products";
import { useRouter } from "next/navigation";
import { useDeleteProduct } from "@/hooks/queries/use-products";
import { toast } from "sonner";

const ProductsPage = () => {
  const router = useRouter();
  // Mock data - replace with your actual data fetching logic
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const {
    data: products,
    isLoading,
    error,
  } = useProducts(currentPage, productsPerPage);
  const { mutate: deleteProduct, isSuccess } = useDeleteProduct();

  const totalPages = products?.totalPages;

  const handleView = (id: number) => {
    // Add view logic
    router.push(`/admin/products/${id}`);
  };

  const handleEdit = (id: number) => {
    // Add edit logic
    router.push(`/admin/products/${id}/edit`);
  };

  const handleDelete = (id: number) => {
    deleteProduct(id);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Product deleted successfully");
    }
  }, [isSuccess]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.products?.map((product: Product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="relative w-16 h-16">
                  <Image
                    src={product.images?.[0]}
                    alt={product.name}
                    fill
                    sizes="64px"
                    className="rounded-md object-cover object-center"
                  />
                </div>
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>{product.brand?.name}</TableCell>
              <TableCell>{product.category?.name}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleView(product.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(product.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages || 1}
          onPageChange={(newPage) => setCurrentPage(newPage)}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
