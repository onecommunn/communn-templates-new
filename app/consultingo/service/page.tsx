"use client";
import React, { Suspense, useContext, useEffect, useState } from "react";
import ConsultingoServiceHero from "./_components/ConsultingoServiceHero";
import ConsultingoServiceContent from "./_components/ConsultingoServiceContent";
import ConsultingoServiceTestimonial from "./_components/ConsultingoServiceTestimonial";
import { useCMS } from "../CMSProvider.client";
import {
  ConsultingoHomePage,
  HomeSection,
  TestimonialSection,
} from "@/models/templates/consultingo/consultingo-home-model";
import { homedummyData } from "../home-dummy-data";
import { useSearchParams } from "next/navigation";
import { AuthContext } from "@/contexts/Auth.context";
import { fetchConsultingoServiceBundle } from "@/services/Consultingo/consultingo.service";
import { Skeleton } from "@/components/ui/skeleton";

interface Service {
  serviceName: string;
  image: string;
  description: string;
  sections: {
    title: string;
    description: string;
    image?: string;
  }[];
}

const ConsultingoServiceRoot = () => {
  const { home } = useCMS();
  const isLoading = home === undefined;
  const source: ConsultingoHomePage | undefined = !isLoading
    ? ((home as ConsultingoHomePage | undefined) ?? homedummyData)
    : undefined;

  const testimonialSectionData = source?.sections?.find(
    (s: HomeSection): s is TestimonialSection =>
      s.sectionName === "testimonialSection" && s.isActive,
  );

  const primaryColor = source?.color?.primary || "#BC4C37";
  const secondaryColor = source?.color?.secondary || "#4F2910";
  const neutralColor = source?.color?.neutral || "#fcf6e8";

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
      const responce = await fetchConsultingoServiceBundle(
        communityId,
        serviceName,
      );
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
    return <LoadingSkeleton />;
  }

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <>
        {serviceData && (
          <ConsultingoServiceHero
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            neutralColor={neutralColor}
            data={{
              image: serviceData?.image,
              serviceName: serviceData?.serviceName,
              description: serviceData?.description,
            }}
          />
        )}
        {serviceData && (
          <ConsultingoServiceContent
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            neutralColor={neutralColor}
            sections={serviceData?.sections}
          />
        )}
        {testimonialSectionData && (
          <ConsultingoServiceTestimonial
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            neutralColor={neutralColor}
            data={testimonialSectionData}
          />
        )}
      </>
    </Suspense>
  );
};

export default ConsultingoServiceRoot;

const LoadingSkeleton = () => {
  return (
    <section className="py-10 md:py-16 bg-[#faf6ec]">
      <div className="container mx-auto px-6 flex flex-col items-center gap-10 md:max-w-[70%] animate-pulse">
        {/* Title */}
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-[320px] bg-gray-300 rounded-md" />
          <div className="h-4 w-[420px] bg-gray-200 rounded-md" />
        </div>

        {/* Large oval image */}
        <div className="w-full max-w-7xl h-[560px] bg-gray-300 rounded-[999px]" />

        {/* Subtitle */}
        <div className="flex flex-col items-center gap-3">
          <div className="h-6 w-[300px] bg-gray-300 rounded-md" />
          <div className="h-4 w-[480px] bg-gray-200 rounded-md" />
        </div>

        {/* Small image */}
        <div className="w-full max-w-6xl h-[460px] bg-gray-300 rounded-[20px]" />

        {/* Steps list */}
        <div className="w-full flex flex-col gap-6 mt-4">
          {[1, 2, 3, 4, 5].map((_, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <div className="h-5 w-[220px] bg-gray-300 rounded-md" />
              <div className="h-4 w-full bg-gray-200 rounded-md" />
              <div className="h-4 w-[90%] bg-gray-200 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
