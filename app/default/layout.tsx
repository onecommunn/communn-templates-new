import { Community } from "@/services/communityService";
import React from "react";

const DefaultShell = ({
  community,
  children,
}: React.PropsWithChildren<{ community: Community }>) => {
  return <div>{children}</div>;
};

export default DefaultShell;
