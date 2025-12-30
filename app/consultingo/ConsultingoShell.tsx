import { Community } from "@/services/communityService";
import React from "react";
import ConsultingoHeader from "./_components/ConsultingoHeader";
import ConsultingoFooter from "./_components/ConsultingoFooter";
import ConsultingoCTA from "./_components/ConsultingoCTA";

export default async function ConsultingoShell({
  community,
  children,
}: React.PropsWithChildren<{ community: Community }>) {
  return (
    <>
      <ConsultingoHeader />
      <main>{children}</main>
       <ConsultingoCTA/>
      <ConsultingoFooter />
    </>
  );
}
