"use client";
import React from "react";
import Breadcum from "../contact-us/_components/Breadcum";
import CollectionsProductesList from "./_components/CollectionsProductesList";
import { useCMS } from "../CMSProvider.client";
import {
  CollectionsCollectionPage,
  CollectionSection,
  HeroSection,
  ItemsSections,
} from "@/models/templates/collections/collections-collection-model";
import { CollectiondummyData } from "./collections-dummy-data";

const CollectionsCollectionsPageRoot = () => {
  const { collections } = useCMS();
  const isLoading = collections === undefined;
  const source: CollectionsCollectionPage | undefined = !isLoading
    ? (collections as CollectionsCollectionPage | undefined) ??
      CollectiondummyData
    : undefined;

  const primaryColor = source?.color?.primary ?? "#C09932";

  const heroSection = source?.sections?.find(
    (s: CollectionSection): s is HeroSection =>
      s.sectionName === "heroSection" && s.isActive
  );

  const itemsSections = source?.sections?.find(
    (s: CollectionSection): s is ItemsSections =>
      s.sectionName === "itemsSections" && s.isActive
  );
  return (
    <>
      {heroSection && (
        <Breadcum
          title={heroSection?.content?.heading}
          bannerImage={
            "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Background.png"
          }
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Collections" }]}
        />
      )}

      {itemsSections && (
        <CollectionsProductesList
          data={itemsSections}
          primaryColor={primaryColor}
        />
      )}
    </>
  );
};

export default CollectionsCollectionsPageRoot;
