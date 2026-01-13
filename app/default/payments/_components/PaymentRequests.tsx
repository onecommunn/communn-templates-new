import { AuthContext } from "@/contexts/Auth.context";
import { usePayment } from "@/hooks/usePayments";
import { IPaymentRequest } from "@/models/payment.model";
import React, { useContext, useEffect, useState } from "react";
import PaymentsSkeleton from "./PaymentsSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const PaymentRequests = () => {
  const { getPaymentStatusById, userPaymentRequest, CustomPay } = usePayment();

  const authContext = useContext(AuthContext);
  const { communityId } = authContext || {};

  const [requestLoading, setRequestLoading] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState<IPaymentRequest[]>([]);
  const [requestUpdate, setRequestUpdate] = useState(false);

  const sortedRequest = paymentRequest?.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  enum PaymentStatus {
    SUCCESS = "SUCCESS",
    PENDING = "PENDING",
    FAILED = "FAILED",
    USERCANCELLED = "USERCANCELLED",
  }

  const formatDateRelative = (dateString: string): string => {
    const inputDate = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - inputDate.getTime();
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);
    if (secondsDifference < 60) {
      return "Just Now";
    } else if (minutesDifference < 60) {
      return `${minutesDifference} minute${
        minutesDifference !== 1 ? "s" : ""
      } ago`;
    } else if (hoursDifference < 24) {
      return `${hoursDifference} hour${hoursDifference !== 1 ? "s" : ""} ago`;
    } else if (daysDifference === 1) {
      return "Yesterday";
    } else if (daysDifference < 7) {
      return `${daysDifference} days ago`;
    } else {
      return inputDate.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  };

  useEffect(() => {
    const fetchPaymentRequest = async () => {
      setRequestLoading(true);
      try {
        const requests = await userPaymentRequest(
          communityId,
          authContext?.user?.id
        );
        setPaymentRequest(requests || []);
      } catch (error) {
        console.error("Error fetching payment requests:", error);
        setPaymentRequest([]);
      } finally {
        setRequestLoading(false);
      }
    };

    fetchPaymentRequest();
  }, [communityId, requestUpdate]);

  return (
    <div className="border border-[#E0E0E0] rounded-[12px] bg-white overflow-auto m-1 min-h-[60vh]">
      {requestLoading ? (
        <PaymentsSkeleton count={20} />
      ) : (
        <>
          {sortedRequest?.length === 0 ? (
            <div className="flex items-center justify-center h-[60vh]">
              <p className="font-semibold text-gray-400">No Payments</p>
            </div>
          ) : (
            sortedRequest.map((item: IPaymentRequest, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 md:p-4 border-b border-[#f0f0f0]"
              >
                <div>
                  <p className="text-[12px] md:text-[14px] font-medium capitalize">
                    {formatDateRelative(item?.updatedAt)}
                  </p>
                  <p className="text-[12px] font-normal text-[#646464]">
                    Requested Date
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage
                        src={item?.createdBy?.avatar}
                        alt="Profile"
                        className="object-cover object-center"
                      />
                      <AvatarFallback>
                        {item?.createdBy?.avatar[0] ?? "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-[12px] md:text-[14px] font-medium capitalize">
                        {item?.createdBy?.firstName} {item?.createdBy?.lastName}
                      </p>
                      <p className="text-[12px] font-normal text-[#646464]">
                        {item?.description?.length > 100
                          ? item?.description?.substring(0, 100) + "..."
                          : item?.description}{" "}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[12px] md:text-[14px] font-medium capitalize">
                    ₹{item?.amount}
                  </p>
                  <p className="text-[12px] font-normal text-[#646464]">
                    Amount
                  </p>
                </div>

                <div className="flex items-center justify-end">
                  <Button className=" flex items-center justify-center md:h-8 px-3 text-xs font-medium bg-[#3D493A] text-white rounded-md cursor-pointer">
                    Pay Now
                  </Button>
                </div>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default PaymentRequests;
