"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { Brand, Category } from "@/types/products";
import SkeletonTable from "@/components/common/SkeletonTable";
import { useBrands, useDeleteBrand } from "@/hooks/queries/use-brands";

const BrandListPage = () => {
  const router = useRouter();
  const { data: brands, isLoading, error } = useBrands();
  const { mutate: deleteBrand } = useDeleteBrand();

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this brand?")) {
      deleteBrand(id);
    }
  };

  if (isLoading)
    return (
      <div className="p-6">
        <SkeletonTable />
      </div>
    );
  if (error) return <div>Error loading categories</div>;

  return (
    <div className="p-6 w-[75vw]">
      <div className="w-[100%] flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Brands</h1>
        <Button onClick={() => router.push("/admin/brand/create")}>
          Add New Brand
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {brands?.brands?.map((brand: Brand) => (
            <TableRow key={brand.id}>
              <TableCell>{brand.id}</TableCell>
              <TableCell>{brand.name}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={() => router.push(`/admin/brand/edit/${brand.id}`)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(brand.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BrandListPage;
