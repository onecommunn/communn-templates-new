import { getStaticValue } from "@/components/utils/StringFunctions";
import { IPaymentList } from "@/models/payment.model";
import { ChevronRight } from "lucide-react";
import React from "react";
import PaymentsSkeleton from "./PaymentsSkeleton";

const AllPayments = ({
  filteredPaymentsList,
  loading,
}: {
  filteredPaymentsList: IPaymentList[];
  loading: boolean;
}) => {
  const getPaymentTitle = (item: IPaymentList): string => {
    if (item?.udf2?.name && item?.course?.name) {
      return `${item.udf2.name} + ${item.course.name}`;
    }
    if (item?.udf2?.name) {
      return item.udf2.name.length > 30
        ? `${item.udf2.name.substring(0, 30)}...`
        : item.udf2.name;
    }
    if (item?.course?.name) return item.course.name;
    if (item?.appointment?.title) return item.appointment.title;
    if (item?.event?.title)
      return item.event.title.length > 20
        ? `${item.event.title.slice(0, 20)}...`
        : item.event.title;

    return "Payment";
  };

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

  const getStatusColor = (status: string): string => {
    if (["Success", "Paid By Cash", "Settled"].includes(status))
      return "#04AE48";
    if (status === "FAILURE") return "#EB3223";
    if (status === "USERCANCELLED") return "#F57E20";
    return "#EB3223";
  };


  if (loading) {
    return <PaymentsSkeleton count={20} />;
  }
  return (
    <div className="border border-[#E0E0E0] rounded-[12px] bg-white overflow-auto m-1 min-h-[60vh]">
      {loading ? (
        <PaymentsSkeleton count={20} />
      ) : (
        <>
          {filteredPaymentsList?.length === 0 ? (
            <div className="flex items-center justify-center h-[60vh]">
              <p className="font-semibold text-gray-400">No Payments</p>
            </div>
          ) : (
            filteredPaymentsList.map((item: IPaymentList, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 md:p-4 border-t border-[#f0f0f0] first:border-none"
              >
                <div>
                  <p className="text-[12px] md:text-[14px] font-medium capitalize">
                    {getPaymentTitle(item)}
                  </p>
                  <p className="text-[12px] font-normal text-[#646464]">
                    {formatDateRelative(item?.createdAt)}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <div className="flex flex-col text-right">
                    <p
                      className="text-[10px] md:text-[12px] font-medium"
                      style={{
                        color: getStatusColor(getStaticValue(item.status)),
                      }}
                    >
                      ₹ {item?.amount}
                    </p>
                    <p
                      className="text-[10px] md:text-[12px] font-medium"
                      style={{
                        color: getStatusColor(getStaticValue(item.status)),
                      }}
                    >
                      {getStaticValue(item?.status) || item.status}
                    </p>
                  </div>
                  <ChevronRight size={20} strokeWidth={1.5} />
                </div>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default AllPayments;
