import { Community } from "@/services/communityService";
import { CMSProvider } from "./CMSProvider.client";
import SpawellHeader from "./_components/SpawellHeader";
import SpawellFooter from "./_components/SpawellFooter";
import { getYoganaCMSBundle } from "@/lib/Yogana/yogana-cms";

export default async function SpawellShell({
  community,
  children,
}: React.PropsWithChildren<{ community: Community }>) {
  const bundle = await getYoganaCMSBundle(community._id);
  const source = bundle?.home;
  const primaryColor = "#5D3222";
  const secondaryColor = "#fff";
  const neutralColor = "#F9F6F1";
  const initialLoading = !bundle?.home || source;
  return (
    <>
      <SpawellHeader
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        neutralColor={neutralColor}
      />
      <CMSProvider initialBundle={bundle} initialLoading={initialLoading}>
        <main>{children}</main>
      </CMSProvider>
      <SpawellFooter
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        neutralColor={neutralColor}
      />
    </>
  );
}
