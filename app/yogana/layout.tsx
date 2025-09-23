import React from "react";
import YoganaHeader from "./_components/YoganaHeader";
import YoganaFooter from "./_components/YoganaFooter";

const YoganaLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <YoganaHeader
        logoUrl="https://cdn.builder.io/api/v1/image/assets%2F228d3b2c4554432dbdd1f0f27ee6ba7c%2Faf41e301c5b247df80bb6243baf910cd"
        logoWidth={100}
        logoHight={100}
      />
      {children}
      <YoganaFooter/>
    </>
  );
};

export default YoganaLayout;
