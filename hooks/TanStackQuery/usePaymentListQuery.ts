import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useSnackbar } from "notistack";
import { AuthContext, IAuthContext } from "../../contexts/Auth.context";
import { paymenttransactionsbyloggedInUser } from "@/services/paymentService";

export const useUserPaymentTransactionsQuery = (communityId?: string) => {
  const { getAccessToken } = useContext<IAuthContext>(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  return useQuery({
    queryKey: ["userPaymentTransactions", communityId],
    enabled: !!communityId && !!getAccessToken(),
    staleTime: 30_000,
    refetchOnWindowFocus: true,
    refetchOnMount: "always",
    queryFn: async () => {
      try {
        const token = getAccessToken();
        const response = await paymenttransactionsbyloggedInUser(
          token,
          communityId!
        );

        if (response?.status === 200) {
          return response.data.data;
        }

        throw new Error("Failed to fetch payment transactions");
      } catch (error) {
        enqueueSnackbar("Couldn't fetch payment transactions", {
          variant: "error",
          autoHideDuration: 3000,
        });
        throw error;
      }
    },
  });
};
