import React from "react";
import { CMSProvider } from "./CMSProvider.client";

const EMPTY_BUNDLE = {
  home: null,
  about: null,
  services: null,
  packages: null,
  portfolio: null,
  contact: null,
};

const PhotographyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CMSProvider initialBundle={EMPTY_BUNDLE} initialLoading={true}>
      {children}
    </CMSProvider>
  );
};

export default PhotographyLayout;
