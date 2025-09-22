// app/creator/layout.tsx
import React from "react";
import CreatorHeader from "./_components/CreatorHeader";
import CreatorFooter from "./_components/CreatorFooter";
import CreatorCTA from "./_components/CreatorCTA";

const CreatorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <CreatorHeader
        logoUrl="https://cdn.builder.io/api/v1/image/assets%2F228d3b2c4554432dbdd1f0f27ee6ba7c%2F062e0f3cd667449793b24103817a0704"
        logoWidth={180}
        logoHight={100}
      />
      <main>{children}</main>
      <CreatorCTA/>
      <CreatorFooter
        logoUrl="https://cdn.builder.io/api/v1/image/assets%2F228d3b2c4554432dbdd1f0f27ee6ba7c%2F062e0f3cd667449793b24103817a0704"
        logoWidth={300}
        logoHight={100}
      />
    </>
  );
};

export default CreatorLayout;
