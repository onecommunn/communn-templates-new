// app/creator/layout.tsx
"use client";

import React, { useContext, useEffect, useState } from "react";
import CreatorHeader from "./_components/CreatorHeader";
import CreatorFooter from "./_components/CreatorFooter";
import { AuthContext } from "@/contexts/Auth.context";
import {
  fetchCreatorHeader,
  fetchCreatorFooter,
} from "@/services/creatorService";
import { CreatorHeaderPage } from "@/models/templates/creator/creator-header.model";
import { CreatorFooterPage } from "@/models/templates/creator/creator-footer-model";
import CreatorHeaderSkeleton from "./_components/Skeletons/CreatorHeaderSkeleton";
import CreatorFooterSkeleton from "./_components/Skeletons/CreatorFooterSkeleton";

const CreatorLayout = ({ children }: { children: React.ReactNode }) => {
  const { communityId } = useContext(AuthContext);
  const [header, setHeader] = useState<CreatorHeaderPage | null>(null);
  const [footer, setFooter] = useState<CreatorFooterPage | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!communityId) return;
    const run = async () => {
      try {
        const [h, f] = await Promise.all([
          fetchCreatorHeader(communityId),
          fetchCreatorFooter(communityId),
        ]);
        setHeader(h?.data ?? null);
        setFooter(f?.data ?? null);
      } catch (e) {
        setError("Failed to load header/footer");
      }
    };
    run();
  }, [communityId]);

  const headerSection = header?.sections?.[0];
  const footerSection = footer?.sections?.[0];

  return (
    <>
      {headerSection ? (
        <CreatorHeader
          section={headerSection} // pass structured section instead of hardcoded logo
        />
      ) : (
        <CreatorHeaderSkeleton />
      )}

      <main>{children}</main>

      {footerSection ? (
        <CreatorFooter
          section={footerSection} // pass structured footer section
        />
      ) : (
        <CreatorFooterSkeleton />
      )}
    </>
  );
};

export default CreatorLayout;
