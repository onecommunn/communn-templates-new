"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthContext } from "@/contexts/Auth.context";
import { useUserPaymentTransactionsQuery } from "@/hooks/TanStackQuery/usePaymentListQuery";
import React, { useContext } from "react";
import AllPayments from "./_components/AllPayments";
import UpcomingPayments from "./_components/UpcomingPayments";
import PaymentRequests from "./_components/PaymentRequests";
import { MartivoHomePage } from "@/models/templates/martivo/martivo-home-model";
import { useCMS } from "../CMSProvider.client";
import { dummyData } from "../DummyData";

const MartivoPaymentsRoot = () => {
  const authContext = useContext(AuthContext);
  const { communityId } = authContext || {};
  const { data: paymentsList = [], isLoading: paymentsLoading } =
    useUserPaymentTransactionsQuery(communityId || "");

  const isAuthReady = !!communityId;
  const isAppLoading = !isAuthReady || paymentsLoading;

  const { home } = useCMS();
  const isLoading = home === undefined;
  const source: MartivoHomePage | undefined = !isLoading
    ? (home as MartivoHomePage | undefined) ?? dummyData
    : undefined;
  const primaryColor = source?.color?.primary || "#29400a";
  const secondaryColor = source?.color?.secondary || "#7bd900";

  return (
    <section
      className="min-h-screen py-6 px-4 sm:px-8 md:px-20 font-lato bg-[#F8F7F4]"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto space-y-8">
        {/* HEADER */}
        <div className="text-center space-y-2">
          <h1 className="text-xl md:text-4xl font-bold tracking-tight text-[var(--pri)]">
            Payments
          </h1>
          <p className="text-sm md:text-lg text-gray-600">
            View and manage all your payment transactions
          </p>

          <div className="w-20 h-1 mx-auto mt-4 rounded-full bg-[var(--sec)]" />
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

export default MartivoPaymentsRoot;
