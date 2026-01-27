import React from "react";
import { CMSProvider } from "./CMSProvider.client";

const EMPTY_BUNDLE = {
  home: null,
  aboutUs: null,
  contact: null,
  collections: null,
};

const MadivalaLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CMSProvider initialBundle={EMPTY_BUNDLE} initialLoading={true}>
      {children}
    </CMSProvider>
  );
};

export default MadivalaLayout;
