import { ProductwithImagesURL } from "./products";

export interface CartPayload{
    productId: number;
    quantity: number;
}

export interface CartResponse {
    id: number;
    createdAt: string;
    updatedAt: string;
    product_id: number;
    quantity: number;
    user_id: number;
    product: ProductwithImagesURL;
}

export interface CartRedux {
    cartItemList: CartResponse[] | null;
    subTotal: number | null;
    tax: number | null;
    total: number | null;
}
export interface CartItem {
    id: number;
}