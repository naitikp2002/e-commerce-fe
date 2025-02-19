"use client";
import React from "react";
import { useCategories } from "@/hooks/queries/use-categories";
import { useDeleteCategory } from "@/hooks/queries/use-categories";
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
import { Category } from "@/types/products";
import { Skeleton } from "@/components/ui/skeleton";
import SkeletonTable from "@/components/common/SkeletonTable";

const CategoryListPage = () => {
  const router = useRouter();
  const { data: categories, isLoading, error } = useCategories();
  const { mutate: deleteCategory } = useDeleteCategory();

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      deleteCategory(id);
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
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button onClick={() => router.push("/admin/category/create")}>
          Add New Category
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
          {categories?.categories?.map((category: Category) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={() =>
                    router.push(`/admin/category/edit/${category.id}`)
                  }
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(category.id)}
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

export default CategoryListPage;
