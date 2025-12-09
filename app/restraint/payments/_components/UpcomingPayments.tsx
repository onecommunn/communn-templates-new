"use client";
import { AuthContext } from "@/contexts/Auth.context";
import { usePayment } from "@/hooks/usePayments";
import React, { useContext, useEffect, useState } from "react";
import PaymentsSkeleton from "./PaymentsSkeleton";
import { getStaticValue } from "@/components/utils/StringFunctions";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const UpcomingPayments = () => {
  const authContext = useContext(AuthContext);
  const { communityId } = authContext || {};
  const { paymentsDue } = usePayment();

  const [dueList, setDueList] = useState([]);
  const [dueLoading, setDueLoading] = useState(true);

  useEffect(() => {
    const fetchDuePayments = async () => {
      setDueLoading(true);
      const requests = await paymentsDue(communityId);
      setDueLoading(false);
      if (requests) {
        setDueList(requests?.upcomingPayments);
      } else {
        setDueList([]);
      }
    };
    fetchDuePayments();
  }, []);

  console.log(dueList, "dueList");
  return (
    <div className="border border-[#E0E0E0] rounded-[12px] bg-white overflow-auto m-1 min-h-[60vh]">
      <div className="md:block hidden">
        {dueLoading ? (
          <PaymentsSkeleton count={20} />
        ) : (
          <>
            {dueList?.length === 0 ? (
              <div className="flex items-center justify-center h-[60vh]">
                <p className="font-semibold text-gray-400">No Payments</p>
              </div>
            ) : (
              dueList?.map((item: any, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 md:p-4 border-b border-[#f0f0f0]"
                >
                  <div>
                    <p className="text-[12px] md:text-[14px] font-medium capitalize">
                      {new Date(item?.nextDueDate).toLocaleString("en-GB", {
                        timeZone: "Asia/Kolkata",
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                        hour12: false,
                      })}
                    </p>
                    <p className="text-[12px] font-normal text-[#646464]">
                      Due Date
                    </p>
                  </div>
                  {/* Plan Info */}
                  <div>
                    <p className="text-[14px] font-medium line-clamp-1">
                      {" "}
                      {item?.plan?.name}
                    </p>
                    <p className="text-[12px] text-[#646464]">
                      {" "}
                      Billed Every {item?.plan?.interval}{" "}
                      {item?.plan?.interval > "1"
                        ? `${getStaticValue(item?.plan?.duration)}s`
                        : getStaticValue(item?.plan?.duration)}{" "}
                    </p>
                  </div>

                  {/* Amount & Plan Type */}
                  <div>
                    <p className="text-[14px] font-medium">
                      ₹ {item?.plan?.pricing}
                    </p>
                    <p className="text-[12px] text-[#646464]"> Amount</p>
                  </div>

                  <div>
                    <Badge className="text-[11px] font-medium px-4 py-1 rounded-full bg-[#e9b200]/10 text-[#e9b200] border border-[#e9b200] self-end">
                      Renew
                    </Badge>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <Link
                      href={`/subscriptions/?planid=${encodeURIComponent(
                        item?.plan?._id
                      )}&communityid=${encodeURIComponent(communityId || "")}`}
                      className=" flex items-center justify-center md:h-8 px-3 text-xs font-medium bg-[#3D493A] text-white rounded-md cursor-pointer"
                    >
                      Pay Now
                    </Link>
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </div>
      <div className="block md:hidden">
        {dueLoading ? (
          <PaymentsSkeleton count={20} />
        ) : (
          <>
            {dueList?.length === 0 ? (
              <div className="flex items-center justify-center h-[60vh]">
                <p className="font-semibold text-gray-400">No Payments</p>
              </div>
            ) : (
              <>
                {dueList?.map((order: any) => (
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full border-b px-4 rounded-none"
                    key={order?._id}
                  >
                    <AccordionItem value={order?._id}>
                      <AccordionTrigger className="hover:no-underline cursor-pointer">
                        <div className="grid grid-cols-2 w-full">
                          {/* LEFT SIDE */}
                          <div className="flex flex-col gap-1.5">
                            <p className="text-[11px] font-medium line-clamp-1">
                              {order?.plan?.name}
                            </p>
                            <p className="text-[10px] font-medium text-[#646464]">
                              Billed Every {order.plan?.interval}{" "}
                              {order.plan?.interval > "1"
                                ? `${getStaticValue(order.plan?.duration)}s`
                                : getStaticValue(order.plan?.duration)}{" "}
                            </p>
                          </div>
                          {/* RIGHT SIDE */}
                          <div className="flex items-center justify-end">
                            <Badge className="text-[11px] font-medium px-4 py-1 rounded-full bg-[#e9b200]/10 text-[#e9b200] border border-[#e9b200]">
                              Renew
                            </Badge>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-2">
                        <div className="grid grid-cols-3">
                          {/* LEFT */}
                          <div>
                            <p className="text-[11px] font-medium">
                              {new Date(order?.nextDueDate).toLocaleString(
                                "en-GB",
                                {
                                  timeZone: "Asia/Kolkata",
                                  year: "numeric",
                                  month: "short",
                                  day: "2-digit",
                                  hour12: false,
                                }
                              )}
                            </p>
                            <p className="text-[10px] font-medium text-[#646464]">
                              Due Date
                            </p>
                          </div>
                          {/* RIGHT */}
                          <div>
                            <p className="text-[11px] font-medium">
                              ₹ {order?.plan?.pricing}
                            </p>
                            <p className="text-[10px] font-medium text-[#646464]">
                              Amount
                            </p>
                          </div>
                          <div className="flex items-center justify-end">
                            <Link
                              href={`/subscriptions/?planid=${encodeURIComponent(
                                order?.plan?._id
                              )}&communityid=${encodeURIComponent(
                                communityId || ""
                              )}`}
                              className=" flex items-center justify-center h-8 px-3 text-xs font-medium bg-[#3D493A] text-white rounded-md cursor-pointer"
                            >
                              Pay Now
                            </Link>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UpcomingPayments;
