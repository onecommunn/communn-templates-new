import { AuthContext, IAuthContext } from "@/contexts/Auth.context";
import { createPauseSubscription } from "@/services/subscription.service";
import { useContext, useState } from "react";
import { toast } from "sonner";

export const useSubscription = () => {
  const { getAccessToken } = useContext<IAuthContext>(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pauseSubscription = async (
    subscriptionId: string,
    pauseDays: number,
    sequenceId: string,
    startDate: string
  ) => {
    setIsLoading(true);
    try {
      const response = await createPauseSubscription(
        subscriptionId,
        pauseDays,
        sequenceId,
        startDate,
        getAccessToken()
      );
      return response;
    } catch (err) {
      toast.error("Couldn't create Subscription");
      return err;
    } finally {
      setIsLoading(false);
    }
  };
  return {
    pauseSubscription,
  };
};
