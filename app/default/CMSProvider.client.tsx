"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";

export type Bundle = {
  home: any | null;
};

type CMSContext = Bundle & {
  loading: boolean;
  refresh: () => Promise<void>;
};

const defaultBundle: Bundle = {
  home: null,
  // add more pages
};

const CMSCtx = createContext<CMSContext | null>(null);

type Props = {
  initialBundle?: Bundle;
  initialLoading?: boolean;
  children: React.ReactNode;
};

export function CMSProvider({
  initialBundle,
  initialLoading = false,
  children,
}: Props) {
  const [bundle, setBundle] = useState<Bundle>(initialBundle ?? defaultBundle);
  const [loading, setLoading] = useState<boolean>(initialLoading);

  // you can wire this to a real endpoint if you want runtime refresh later
  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      // no-op: keep latest bundle (server already hydrated it)
      // If you add an API to refetch, setBundle(await fetch(...))
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo<CMSContext>(
    () => ({ ...(bundle ?? defaultBundle), loading, refresh }),
    [bundle, loading, refresh]
  );

  return <CMSCtx.Provider value={value}>{children}</CMSCtx.Provider>;
}

export function useCMS() {
  const ctx = useContext(CMSCtx);
  if (!ctx) throw new Error("useCMS must be used within CMSProvider");
  return ctx;
}
