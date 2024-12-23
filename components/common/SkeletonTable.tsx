import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const SkeletonTable = () => {
  return (
    <div><div className="flex justify-between items-center mb-6">
    <Skeleton className="h-8 w-[150px]" />
    <Skeleton className="h-10 w-[150px]" />
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
      {[...Array(5)].map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="h-4 w-[40px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[150px]" />
          </TableCell>
          <TableCell className="flex gap-2">
            <Skeleton className="h-9 w-[70px]" />
            <Skeleton className="h-9 w-[70px]" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table></div>
  )
}

export default SkeletonTable