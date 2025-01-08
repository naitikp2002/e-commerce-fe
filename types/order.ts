import { User } from "./users";

export interface Order {
  id: number;
  address_id: number;
  payment_details: PaymentDetails;
  total_amount: number;
  createdAt: string;
  updatedAt: string;
  payment_status: string;
  product_id: number;
  quantity: number;
  user_id: number;
  user: User;
}
export interface PaymentDetails {
  card: Card;
  type: string;
}
export interface Card {
  brand: string;
  last4: string;
  exp_month: number;
  exp_year: number;
  display_brand: string;
}

export interface CardResponse {
  card: Card;
  id: number;
}