import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-service";
import { Brand } from "@/types/products";
import { getToken } from "@/lib/auth";
import axios from "axios";
import { CartPayload } from "@/types/cart";
import { toast } from "sonner";
// Query keys
export const paymentKeys = {
  all: ["payment"] as const,
  lists: () => [...paymentKeys.all, "list"] as const,
  list: () => [...paymentKeys.lists()] as const,
  details: () => [...paymentKeys.all, "detail"] as const,
  detail: (id: number) => [...paymentKeys.details(), id] as const,
};

// export const useCreatePayment = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({ ...data }: {paymentIntentId:string}) => {
//       try {
//         const response = await apiClient.post(
//           `http://localhost:8080/api/payment/place-order`,
//           data,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               // Authorization: `${getToken()}`,
//             },
//           }
//         );
//         return response.data;
//       } catch (error) {
//         console.error("Payment creation failed", error);
//         toast.error("Payment creation failed. Please try again.");
//         throw error;
//       }
//     },
//     onSuccess: (data) => {
//       // queryClient.invalidateQueries({ queryKey: paymentKeys.detail(data.id) });
//       queryClient.invalidateQueries({ queryKey: paymentKeys.lists() });
//       toast.success(data.message);
//     },
//     onError: (error) => {
//       console.error("Payment creation failed", error);
//       toast.error("Payment creation failed. Please try again.");
//     },
//   });
// };

export const useCreatePayment = (paymentIntentId: string) => {
  return useQuery({
    queryKey: paymentKeys.list(),
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

// export const useCreatePayment = (paymentIntentId: string) => {
//   return useQuery({
//     queryKey: paymentKeys.list(),
//     queryFn: async () => {
//       const response = await fetch(
//         `http://localhost:8080/api/payment/place-order?paymentIntentId=${paymentIntentId}`,
//         {}
//       );
//       if (!response.ok) {
//         // throw new Error("Failed to fetch categories")
//         toast.error("Failed to fetch categories");
//       } else {
//         toast.success("Payment successful");
//       }
//       return response.json();
//     },
//   });
// };
