"use client";
import React, { useContext, useEffect, useState } from "react";
import YoganaServiceHero from ".././_components/YoganaServiceHero";
import { Service } from "@/models/templates/yogana/yogana-home-model";
import YoganaServiceContent from ".././_components/YoganaServiceContent";
import { useSearchParams } from "next/navigation";
import { AuthContext } from "@/contexts/Auth.context";
import { fetchYoganaServiceBundle } from "@/lib/Yogana/yogana-service-cms";

const YoganaServicePage = ({
  primaryColor,
  secondaryColor,
  neutralColor,
}: {
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
}) => {
  const searchParams = useSearchParams();
  const serviceName = searchParams.get("name");
  const [serviceData, setServiceData] = useState<Service>();
  const [loading, setLoading] = useState<Boolean>(true);

  const auth = useContext(AuthContext);
  const { communityId } = auth;

  const fetchData = async () => {
    try {
      if (!serviceName || !communityId) return;
      setLoading(true);
      const responce = await fetchYoganaServiceBundle(communityId, serviceName);
      setServiceData(responce?.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [serviceName, communityId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="mx-auto py-8">
          <div className="rounded-2xl overflow-hidden mb-8">
            <div className="relative h-[70vh] w-full bg-gray-200 animate-pulse" />
          </div>

          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-8 mb-10">
              <div
                className={`bg-gray-200 rounded-xl shadow border p-6 space-y-4 h-[400px] ${
                  index % 2 == 0 ? "order-0" : "order-1"
                }`}
              />

              <div className="md:col-span-1 space-y-6 flex justify-center flex-col">
                <div className="h-7 w-[100px] bg-gray-200 rounded animate-pulse" />
                <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="space-y-3">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-11/12 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-10/12 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-10/12 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <main>
      {serviceData && (
        <YoganaServiceHero
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          neutralColor={neutralColor}
          data={serviceData}
        />
      )}

      {serviceData?.sections?.map((item, idx) => (
        <YoganaServiceContent
          key={idx}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          title={item.title}
          tag={item?.tag}
          image={item?.image}
          description={item?.description}
          align={idx % 2 !== 0 ? "Left" : "Right"}
          neutralColor={neutralColor}
        />
      ))}
    </main>
  );
};

export default YoganaServicePage;
