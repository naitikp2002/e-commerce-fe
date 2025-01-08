"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminAllOrders } from "@/hooks/queries/use-orders";
import { format } from "date-fns";
import { Order } from "@/types/order";
import { Pagination } from "../ui/pagination";

// Mock data for orders
const initialOrders = [
  {
    id: "1",
    date: "2023-05-01",
    customer: "John Doe",
    total: 99.99,
    status: "Delivered",
  },
  {
    id: "2",
    date: "2023-05-02",
    customer: "Jane Smith",
    total: 149.99,
    status: "Processing",
  },
  {
    id: "3",
    date: "2023-05-03",
    customer: "Bob Johnson",
    total: 79.99,
    status: "Shipped",
  },
  {
    id: "4",
    date: "2023-05-04",
    customer: "Alice Brown",
    total: 199.99,
    status: "Pending",
  },
  {
    id: "5",
    date: "2023-05-05",
    customer: "Charlie Davis",
    total: 129.99,
    status: "Delivered",
  },
];

export default function AdminOrdersListTable() {
  const [orders, setOrders] = useState(initialOrders);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data: ordersList, isLoading } = useAdminAllOrders(
    page,
    10,
    sortColumn,
    sortDirection,
    search
  );
  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }

    const sortedOrders = [...orders].sort((a, b) => {
      if (a[column as keyof typeof a] < b[column as keyof typeof b])
        return sortDirection === "asc" ? -1 : 1;
      if (a[column as keyof typeof a] > b[column as keyof typeof b])
        return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    setOrders(sortedOrders);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearch(event.target.value);
    const searchTerm = event.target.value.toLowerCase();
    const filteredOrders = initialOrders.filter(
      (order) =>
        order.id.toLowerCase().includes(searchTerm) ||
        order.customer.toLowerCase().includes(searchTerm) ||
        order.status.toLowerCase().includes(searchTerm)
    );
    setOrders(filteredOrders);
  };
  // if (isLoading) return <div>Loading...</div>;
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex justify-between items-center">
            <span>All Orders</span>
            <Input
              className="max-w-sm"
              placeholder="Search orders..."
              onChange={handleSearch}
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">
                  <Button variant="ghost" onClick={() => handleSort("id")}>
                    Order ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("createdAt")}>
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                  >
                    Customer
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button variant="ghost" onClick={() => handleSort("total_amount")}>
                    Total
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("payment_status")}>
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                ordersList?.orders.map((order: Order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      {order.createdAt &&
                        format(new Date(order.createdAt), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell>{order.user.name}</TableCell>
                    <TableCell className="text-right">
                      ${order.total_amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          order.payment_status
                        )}`}
                      >
                        {order.payment_status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Link
                              href={`/admin/orders/${order.id}`}
                              className="flex items-center"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => alert(`Edit order ${order.id}`)}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => alert(`Cancel order ${order.id}`)}
                          >
                            Cancel Order
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="mt-3 flex justify-center">
        <Pagination
          currentPage={ordersList?.currentPage}
          totalPages={ordersList?.totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case "Success":
      return "bg-green-100 text-green-800";
    case "Delivered":
      return "bg-green-100 text-green-800";
    case "Processing":
      return "bg-blue-100 text-blue-800";
    case "Shipped":
      return "bg-purple-100 text-purple-800";
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
