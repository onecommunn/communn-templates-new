import React from "react";
import { CMSProvider } from "./CMSProvider.client";

const EMPTY_BUNDLE = {
  recommandations: null,
  categories: null,
};

const Influencerlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CMSProvider initialBundle={EMPTY_BUNDLE} initialLoading={true}>
      {children}
    </CMSProvider>
  );
};

export default Influencerlayout;
