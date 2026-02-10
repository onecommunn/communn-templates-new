"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthContext } from "@/contexts/Auth.context";
import { useUserPaymentTransactionsQuery } from "@/hooks/TanStackQuery/usePaymentListQuery";
import React, { useContext } from "react";
import AllPayments from "./_components/AllPayments";
import UpcomingPayments from "./_components/UpcomingPayments";
import PaymentRequests from "./_components/PaymentRequests";
import { useCMS } from "../CMSProvider.client";
import { YoganaHomePage } from "@/models/templates/yogana/yogana-home-model";
import { dummyData } from "../dummyData";

const YoganaPaymentsRoot = () => {
  const authContext = useContext(AuthContext);
  const { communityId } = authContext || {};
  const isSandeepyogatherapy = communityId === "69439db7f689aa2886339d41";
  const { data: paymentsList = [], isLoading: paymentsLoading } =
    useUserPaymentTransactionsQuery(communityId || "");

  const isAuthReady = !!communityId;
  const isAppLoading = !isAuthReady || paymentsLoading;

  const { home } = useCMS();
  const isLoading = home === undefined;
  const source: YoganaHomePage | undefined = !isLoading
    ? ((home as YoganaHomePage | undefined) ?? dummyData)
    : undefined;

  const primaryColor = source?.color?.primary || "#C2A74E";
  const secondaryColor = source?.color?.secondary || "#000";
  const neutralColor = source?.color?.neutral || "#707070";

  return (
    <section
      className="min-h-screen py-6 px-4 sm:px-8 md:px-20 bg-[#F8F7F4]"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
          "--neu": neutralColor,
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto space-y-8">
        {/* HEADER */}
        <div className="text-center space-y-2">
          <h1 className={`text-xl md:text-5xl font-bold ${isSandeepyogatherapy ? "" : "font-alex-brush"}  tracking-wider text-[var(--pri)]`}>
            Payments
          </h1>
          <p className="text-sm md:text-lg text-gray-600">
            View and manage all your payment transactions
          </p>

          <div className="w-20 h-1 mx-auto mt-4 rounded-full bg-[var(--pri)]" />
        </div>
        <div className="w-full p-1 rounded-[12px] border border-[#E7EBF1] bg-white">
          <Tabs defaultValue="payment_history">
            <TabsList className="!h-fit bg-white gap-1">
              <TabsTrigger
                value="payment_history"
                className="!py-3 hidden md:flex !px-4 cursor-pointer data-[state=active]:bg-[#F9F9F9] data-[state=active]:text-black text-[#969696] data-[state=active]:shadow-none shadow-none border data-[state=active]:border-[#E7EBF1] hover:bg-[#F9F9F9]"
              >
                Payment History
              </TabsTrigger>
              <TabsTrigger
                value="payment_history"
                className="!py-3 md:hidden !px-4 cursor-pointer data-[state=active]:bg-[#F9F9F9] data-[state=active]:text-black text-[#969696] data-[state=active]:shadow-none shadow-none border data-[state=active]:border-[#E7EBF1] hover:bg-[#F9F9F9]"
              >
                History
              </TabsTrigger>
              <TabsTrigger
                value="upcoming_payments"
                className="!py-3 !px-4 md:flex hidden cursor-pointer data-[state=active]:bg-[#F9F9F9] data-[state=active]:text-black text-[#969696] data-[state=active]:shadow-none shadow-none border data-[state=active]:border-[#E7EBF1] hover:bg-[#F9F9F9]"
              >
                Upcoming Payments
              </TabsTrigger>
              <TabsTrigger
                value="upcoming_payments"
                className="!py-3 !px-4 md:hidden cursor-pointer data-[state=active]:bg-[#F9F9F9] data-[state=active]:text-black text-[#969696] data-[state=active]:shadow-none shadow-none border data-[state=active]:border-[#E7EBF1] hover:bg-[#F9F9F9]"
              >
                Upcoming
              </TabsTrigger>
              {/* <TabsTrigger
                value="payment_requests"
                className="!py-3 !px-4 md:flex hidden cursor-pointer data-[state=active]:bg-[#F9F9F9] data-[state=active]:text-black text-[#969696] data-[state=active]:shadow-none shadow-none border data-[state=active]:border-[#E7EBF1] hover:bg-[#F9F9F9]"
              >
                Payment Requests
              </TabsTrigger> */}
              {/* <TabsTrigger
                value="payment_requests"
                className="!py-3 !px-4 md:hidden cursor-pointer data-[state=active]:bg-[#F9F9F9] data-[state=active]:text-black text-[#969696] data-[state=active]:shadow-none shadow-none border data-[state=active]:border-[#E7EBF1] hover:bg-[#F9F9F9]"
              >
                Requests
              </TabsTrigger> */}
            </TabsList>
            <TabsContent value="payment_history">
              <AllPayments
                filteredPaymentsList={paymentsList}
                loading={isAppLoading}
              />
            </TabsContent>
            <TabsContent value="upcoming_payments">
              <UpcomingPayments />
            </TabsContent>
            {/* <TabsContent value="payment_requests">
                <PaymentRequests/>
            </TabsContent> */}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default YoganaPaymentsRoot;
