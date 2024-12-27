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
import { Brand, Category, Product } from "@/types/products";
import { useRouter } from "next/navigation";
import { useDeleteProduct } from "@/hooks/queries/use-products";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/hooks/queries/use-categories";
import { useBrands } from "@/hooks/queries/use-brands";
import { Input } from "@/components/ui/input";

const ProductsPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [brandFilter, setBrandFilter] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const productsPerPage = 10;

  const {
    data: products,
    isLoading,
    error,
  } = useProducts(currentPage, productsPerPage, categoryFilter, brandFilter, searchTerm);
  const { mutate: deleteProduct, isSuccess } = useDeleteProduct();
  const { data: categories, isLoading: isLoadingCategories, error: errorCategories } = useCategories();
  const { data: brands, isLoading: isLoadingBrands, error: errorBrands } = useBrands();

  const totalPages = products?.totalPages;

  const handleView = (id: number) => {
    router.push(`/admin/products/${id}`);
  };

  const handleEdit = (id: number) => {
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

      <div className="flex gap-4 my-4">
        <Input
          type="text"
          placeholder="Search by product details"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded"
        />

        <Select value={categoryFilter || undefined} onValueChange={setCategoryFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {isLoadingCategories && <div>Loading categories...</div>}
            {errorCategories && <div>Error loading categories</div>}
            {categories?.categories?.map((category: Category) => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={brandFilter || undefined} onValueChange={setBrandFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All Brands" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Brands</SelectItem>
            {isLoadingBrands && <div>Loading brands...</div>}
            {errorBrands && <div>Error loading brands</div>}
            {brands?.brands?.map((brand: Brand) => (
              <SelectItem key={brand.id} value={brand.id.toString()}>
                {brand.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.products?.map((product: Product, index: number) => (
            <TableRow key={product.id}>
              <TableCell>{index + 1}</TableCell>
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
