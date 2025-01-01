import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Star } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description: string;
    images: string[];
    price: number;
    rating: string;
    favourite: boolean;
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
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="w-[300px] overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-[200px] w-full">
          <Image
            src={product.images?.[0]}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <Badge variant="secondary">${product.price}</Badge>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline">{product.category.name}</Badge>
          <Badge variant="outline">{product.brand.name}</Badge>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{product.rating}</span>
          </div>
          <div className="flex gap-2 justify-center items-center">
          <span className=" text-sm text-muted-foreground">
            Stock: {product.stock}
          </span>
          {product.favourite && <Heart className="h-4 w-4 fill-red-500 text-red-500" />}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
