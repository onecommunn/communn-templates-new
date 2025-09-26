// templates/default/DefaultShell.tsx
import React from "react";
import { Community } from "@/services/communityService";

export default function DefaultShell({
  community,
  children,
}: React.PropsWithChildren<{ community: Community }>) {
  return <div>{children}</div>;
}
