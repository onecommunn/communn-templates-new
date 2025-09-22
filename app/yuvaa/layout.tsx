import React from "react";
import YuvaaHeader from "./_components/YuvaaHeader";

const YuvaaLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <YuvaaHeader
        logoUrl="https://cdn.builder.io/api/v1/image/assets%2F228d3b2c4554432dbdd1f0f27ee6ba7c%2F5da7e1a66018428ab7a6081eeee906ad"
        logoHight={100}
        logoWidth={100}
        buttonText="Join Now"
        backgroundColor={"#ffffff"}
        textColor={"#000000"}
        buttonBackgroundColor={"#ff6347"}
        buttonTextColor={"#ffffff"}
      />
      {children}
    </>
  );
};

export default YuvaaLayout;
