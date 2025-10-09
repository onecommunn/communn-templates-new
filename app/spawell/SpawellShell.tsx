import { Community } from "@/services/communityService";
import { CMSProvider } from "./CMSProvider.client";
import SpawellHeader from "./_components/SpawellHeader";
import SpawellFooter from "./_components/SpawellFooter";

export default async function SpawellShell({
  community,
  children,
}: React.PropsWithChildren<{ community: Community }>) {
  return (
    <>
      <SpawellHeader />
      {children}
      <SpawellFooter />
    </>
  );
}
