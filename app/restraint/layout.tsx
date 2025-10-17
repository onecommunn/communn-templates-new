import React from "react";
import { CMSProvider } from "./CMSProvider.client";

const EMPTY_BUNDLE = {
  header: null,
  footer: null,
  home: null,
};

const RestraintLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CMSProvider initialBundle={EMPTY_BUNDLE} initialLoading={true}>
      {children}
    </CMSProvider>
  );
};

export default RestraintLayout;
