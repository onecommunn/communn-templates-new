// app/creator/layout.tsx
import React from "react";
import { CMSProvider } from "./CMSProvider.client";

// tiny empty bundle so pages can render skeletons during prerender
const EMPTY_BUNDLE = {
  header: null,
  footer: null,
  home: null,
  about: null,
  contact: null,
};

export default function CreatorRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CMSProvider initialBundle={EMPTY_BUNDLE} initialLoading={true}>
      {children}
    </CMSProvider>
  );
}
