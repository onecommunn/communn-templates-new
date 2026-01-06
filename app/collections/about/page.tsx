import React from "react";
import CollectionsAboutSection from "./_components/CollectionsAboutSection";
import CollectionsService from "../_components/CollectionsService";
import CollectionsPersonaliseSection from "./_components/CollectionsPersonaliseSection";
import CollectionsTestimonialsSection from "./_components/CollectionsTestimonialsSection";
import CollectionsAboutGallery from "./_components/CollectionsAboutGallery";
import Breadcum from "../contact-us/_components/Breadcum";

const CollectionsAboutRoot = () => {


  const heroBanner = "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Background2323.png";

  return (
    <>
      <Breadcum
        title="About Us"
        bannerImage={heroBanner}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
      />
      <CollectionsAboutSection
        title="Woven with culture and care"
        description="We curate handcrafted sarees that reflect India’s rich textile heritage while embracing contemporary style. "
        image="https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/683ba737053456d91557ffd06ed132feb734ff4d.jpg"
        pointes={[
          "Celebrate the legacy of Indian handlooms and regional traditions",
          "Every saree should feel like a verse — lyrical, expressive, and uniquely yours",
        ]}
        button={{
          label: "View Collections",
          url: "/",
        }}
      />
      <CollectionsAboutSection
        title="Community-Focused & Local"
        image="https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/330b6b3b09b00a2723d6dfc435eb9f2eeb0f0370.jpg"
        description="A small, community-centric boutique that emphasizes relationships over transactions — reflected in its excellent local reviews and loyal repeat clientele."
        button={{
          label: "Shop Now",
          url: "/",
        }}
        imagePlace="Right"
      />
      <CollectionsPersonaliseSection />
      <CollectionsService />
      <CollectionsTestimonialsSection />
      <CollectionsAboutGallery />
    </>
  );
};

export default CollectionsAboutRoot;
