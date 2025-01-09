import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getToken } from "@/lib/auth";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Query keys
export const paymentKeys = {
  all: ["payment"] as const,
  lists: () => [...paymentKeys.all, "list"] as const,
  list: () => [...paymentKeys.lists()] as const,
  details: () => [...paymentKeys.all, "detail"] as const,
  detail: (id: number) => [...paymentKeys.details(), id] as const,
};

export const useCreatePayment = (paymentIntentId: string) => {
  return useQuery({
    queryKey: [],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/payment/place-order?paymentIntentId=${paymentIntentId}`
        );
        toast.success("Payment successful");
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An unknown error occurred.");
        }
        throw error;
      }
    },
  });
};

export const usePaymentBySavedCard = () => {
  const router = useRouter(); // Initialize useRouter

  return useMutation({
    mutationFn: ({
      paymentMethodId,
      amount,
      selectedAddress
    }: {
      paymentMethodId: number | string;
      amount: number;
      selectedAddress: number | string;
    }) => {
      // try {
      return axios.post(
        `http://localhost:8080/api/payment/make-payment`,
        {
          paymentMethodId,
          amount, // Use the actual amount passed
          selectedAddress,
        },
        {
          headers: {
            Authorization: getToken(), // Ensure this function retrieves a valid token
          },
        }
      );
    },
    onSuccess: (data) => {
      console.log(data?.data.paymentIntent.amount / 100);
      const amount = data?.data.paymentIntent.amount / 100;
      const paymentIntentId = data?.data.paymentIntent.id;

      toast.success("Payment successful"); // Success toast

      router.push(
        `/payment-success?amount=${amount}&payment_intent=${paymentIntentId}`
      ); // Navigate to the success page
    },
    onError: (error) => {
      // This will only handle unexpected errors
      console.error("Unexpected error in mutation:", error);
      toast.error("An unexpected error occurred. Please try again.");
    },
  });
};

// http://localhost:3000/payment-success?amount=165&payment_intent=pi_3QfF6GL6qcJ4o2wV0w4YdgM0&payment_intent_client_secret=pi_3QfF6GL6qcJ4o2wV0w4YdgM0_secret_b5dPR4P1k5o1LP1cHVoy9AxGB&redirect_status=succeeded
