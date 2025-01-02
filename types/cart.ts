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
    selectedAddress: number | null;
}
export interface CartItem {
    id: number;
}

export interface AddressForm {
    name: string;
    email: string;
    mobile: string;
    street_address: string;
    city: string;
    zip_code: string;
    country: string;
  }