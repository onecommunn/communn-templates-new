import React from "react";
import Breadcum from "../contact-us/_components/Breadcum";
import CollectionsProductesList from "./_components/CollectionsProductesList";

const CollectionsCollectionsPageRoot = () => {
  return (
    <>
      <Breadcum
        title="Our Collections"
        bannerImage={
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Background.png"
        }
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Collections" }]}
      />
      <CollectionsProductesList />
    </>
  );
};

export default CollectionsCollectionsPageRoot;
