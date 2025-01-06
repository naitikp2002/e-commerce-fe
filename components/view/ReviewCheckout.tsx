import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

// Mock data for cart items
const cartItems = [
  { id: 1, name: "Product 1", quantity: 2, price: 19.99 },
  { id: 2, name: "Product 2", quantity: 1, price: 29.99 },
  { id: 3, name: "Product 3", quantity: 3, price: 15.99 },
];

// Mock data for shipping address
const shippingAddress = {
  name: "John Doe",
  street: "123 Main St",
  city: "Anytown",
  state: "CA",
  zipCode: "12345",
  country: "USA",
};

export default function ReviewCheckout() {
  const cartItems = useSelector((state: RootState) => state.cart.cartItemList);

  const shippingAddress = useSelector(
    (state: RootState) => state.cart.selectedAddressDetails
  );

  const subtotal = useSelector((state: RootState) => state.cart.subTotal);
  const tax = useSelector((state: RootState) => state.cart.tax); // Assuming 8% tax
  const total = useSelector((state: RootState) => state.cart.total);

  return (
    <div className="max-w-full mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center mb-6">Review Your Order</h1>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
      <Card>
        <CardHeader>
          <CardTitle>Cart Items</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <ScrollArea className="h-[300px]"> */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartItems?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item?.product.name}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">
                    ${item?.product.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${(item.quantity * item?.product.price).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* </ScrollArea> */}
          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (8%):</span>
              <span>${tax?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>${total?.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Shipping Address</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {shippingAddress?.name}
            </p>
            <p>
              <strong>Email:</strong> {shippingAddress?.email}
            </p>
            <p>
              <strong>Street:</strong> {shippingAddress?.street_address}
            </p>
            <p>
              <strong>City:</strong> {shippingAddress?.city}
            </p>
            <p>
              <strong>Zip Code:</strong> {shippingAddress?.zip_code}
            </p>
            <p>
              <strong>Country:</strong> {shippingAddress?.country}
            </p>
          </div>
        </CardContent>
      </Card>
      {/* </div> */}
    </div>
  );
}
