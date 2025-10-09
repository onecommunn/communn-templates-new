import { Community } from "@/services/communityService";
import { CMSProvider } from "./CMSProvider.client";
import SpawellHeader from "./_components/SpawellHeader";
import SpawellFooter from "./_components/SpawellFooter";

export default async function SpawellShell({
  community,
  children,
}: React.PropsWithChildren<{ community: Community }>) {
  const primaryColor = "#5D3222";
  const secondaryColor = "#fff";
  const neutralColor = "#F9F6F1";
  return (
    <>
      <SpawellHeader
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        neutralColor={neutralColor}
      />
      {children}
      <SpawellFooter
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        neutralColor={neutralColor}
      />
    </>
  );
}
