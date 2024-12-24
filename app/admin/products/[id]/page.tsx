"use client";
import ProductDetails from '@/components/common/ProductDetails';
import { Button } from '@/components/ui/button';
import { useProduct } from '@/hooks/queries/use-products';
import { useRouter } from 'next/navigation';

export default function ProductPage({ params }: { params: { id: number } }) {
  const router = useRouter();
  const { data : product, isLoading, error } = useProduct(params.id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <main>
      <div className="p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Product Details</h1>
        <Button onClick={() => router.back()}>Back</Button>
      </div>
      <ProductDetails product={product?.product} isAdmin={true} />
    </main>
  );
} 