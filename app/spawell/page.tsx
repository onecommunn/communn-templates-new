"use client";
import React from "react";
import SpawellHero from "./_components/SpawellHero";
import SpawellAboutus from "./_components/SpawellAboutus";
import SpawellFeaturedAppointments from "./_components/SpawellFeaturedAppointments";
import SpawellCourses from "./_components/SpawellCourses";
import SpawellServices from "./_components/SpawellServices";
import SpawellEvents from "./_components/SpawellEvents";
import SpawellWhyChooseus from "./_components/SpawellWhyChooseus";
import SpawellTeam from "./_components/SpawellTeam";
import SpawellTestimonials from "./_components/SpawellTestimonials";
import SpawellContact from "./_components/SpawellConatct";
import SpawellFAQ from "./_components/SpawellFAQ";
import SpawellPlans from "./_components/SpawellPlans";
import AnimatedContent from "@/components/CustomComponents/AnimatedContent";
import { useCMS } from "./CMSProvider.client";
import {
  AboutSection,
  AboutTwoSection,
  ContactSection,
  EventsSection,
  FaqSection,
  FeaturedAppointmentSection,
  HeroSection,
  HomeSection,
  OurTeamSection,
  PlansSection,
  ServiceSection,
  SpawellHomePage,
  TestimoniesSection,
  WhyChooseUsSection,
} from "@/models/templates/spawell/spawell-home-model";
import { dummyData } from "./DummyData";

const SpawellRoot = () => {
  const { home } = useCMS();
  const isLoading = home === undefined;
  const source: SpawellHomePage | undefined = !isLoading
    ? (home as SpawellHomePage | undefined) ?? dummyData
    : undefined;

  const heroSectionData = source?.sections?.find(
    (s: HomeSection): s is HeroSection => s.sectionName === "heroSection"
  );

  const aboutSectionData = source?.sections?.find(
    (s: HomeSection): s is AboutSection => s.sectionName === "aboutSection"
  );

  const featuredAppointmentSection = source?.sections?.find(
    (s: HomeSection): s is FeaturedAppointmentSection =>
      s.sectionName === "featuredAppointmentSection"
  );

  const aboutTwoSection = source?.sections?.find(
    (s: HomeSection): s is AboutTwoSection =>
      s.sectionName === "aboutTwoSection"
  );

  const serviceSection = source?.sections?.find(
    (s: HomeSection): s is ServiceSection => s.sectionName === "serviceSection"
  );

  const eventsSection = source?.sections?.find(
    (s: HomeSection): s is EventsSection => s.sectionName === "eventsSection"
  );

  const plansSection = source?.sections?.find(
    (s: HomeSection): s is PlansSection => s.sectionName === "plansSection"
  );

  const whyChooseUsSection = source?.sections?.find(
    (s: HomeSection): s is WhyChooseUsSection =>
      s.sectionName === "whyChooseUsSection"
  );

  const ourTeamSection = source?.sections?.find(
    (s: HomeSection): s is OurTeamSection => s.sectionName === "ourTeamSection"
  );

  const testimoniesSection = source?.sections?.find(
    (s: HomeSection): s is TestimoniesSection =>
      s.sectionName === "testimoniesSection"
  );

  const faqSection = source?.sections?.find(
    (s: HomeSection): s is FaqSection => s.sectionName === "faqSection"
  );

  const contactSection = source?.sections?.find(
    (s: HomeSection): s is ContactSection => s.sectionName === "contactSection"
  );

  const primaryColor = source?.color?.primary || "#5D3222";
  const secondaryColor = source?.color?.secondary || "#fff";
  const neutralColor = source?.color?.neutral || "#F9F6F1";
  return (
    <>
      {heroSectionData && (
        <SpawellHero
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          neutralColor={neutralColor}
          data={heroSectionData}
        />
      )}

      {aboutSectionData && (
        <SpawellAboutus
          data={aboutSectionData}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          neutralColor={neutralColor}
        />
      )}

      {featuredAppointmentSection && (
        <SpawellFeaturedAppointments
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          neutralColor={neutralColor}
          data={featuredAppointmentSection}
        />
      )}
      {aboutTwoSection && (
        <SpawellCourses
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          neutralColor={neutralColor}
          data={aboutTwoSection}
        />
      )}
      {serviceSection && (
        <SpawellServices
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          neutralColor={neutralColor}
          data={serviceSection}
        />
      )}

      {plansSection && (
        <AnimatedContent
          distance={150}
          direction="vertical"
          reverse={false}
          duration={1.2}
          initialOpacity={0.2}
          animateOpacity
          scale={1}
          threshold={0.2}
          delay={0.3}
        >
          <SpawellPlans
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            neutralColor={neutralColor}
            data={plansSection}
          />
        </AnimatedContent>
      )}

      {eventsSection && (
        <AnimatedContent
          distance={150}
          direction="vertical"
          reverse={false}
          duration={1.2}
          initialOpacity={0.2}
          animateOpacity
          scale={1}
          threshold={0.2}
          delay={0.3}
        >
          <SpawellEvents
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            neutralColor={neutralColor}
            data={eventsSection}
          />
        </AnimatedContent>
      )}

      {whyChooseUsSection && (
        <SpawellWhyChooseus
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          neutralColor={neutralColor}
          data={whyChooseUsSection}
        />
      )}

      {ourTeamSection && (
        <SpawellTeam
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          neutralColor={neutralColor}
          data={ourTeamSection}
        />
      )}

      {testimoniesSection && (
        <AnimatedContent
          distance={150}
          direction="vertical"
          reverse={false}
          duration={1.2}
          initialOpacity={0.2}
          animateOpacity
          scale={1}
          threshold={0.2}
          delay={0.3}
        >
          <SpawellTestimonials
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            neutralColor={neutralColor}
            data={testimoniesSection}
          />
        </AnimatedContent>
      )}

      {faqSection && (
        <AnimatedContent
          distance={150}
          direction="vertical"
          reverse={false}
          duration={1.2}
          initialOpacity={0.2}
          animateOpacity
          scale={1}
          threshold={0.2}
          delay={0.3}
        >
          <SpawellFAQ
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            neutralColor={neutralColor}
            data={faqSection}
          />
        </AnimatedContent>
      )}

      {contactSection && (
        <AnimatedContent
          distance={150}
          direction="vertical"
          reverse={false}
          duration={1.2}
          initialOpacity={0.2}
          animateOpacity
          scale={1}
          threshold={0.2}
          delay={0.3}
        >
          <SpawellContact
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            neutralColor={neutralColor}
            data={contactSection}
          />
        </AnimatedContent>
      )}
    </>
  );
};

export default SpawellRoot;
