import { Community } from "@/services/communityService";
import { CMSProvider } from "./CMSProvider.client";
import SpawellHeader from "./_components/SpawellHeader";
import SpawellFooter from "./_components/SpawellFooter";
import { getSpawellCMSBundle } from "@/lib/Spawell/spawell-cms";
import {
  FooterSection,
  Header,
  HomeSection,
} from "@/models/templates/spawell/spawell-home-model";

export default async function SpawellShell({
  community,
  children,
}: React.PropsWithChildren<{ community: Community }>) {
  const bundle = await getSpawellCMSBundle(community._id);
  const source = bundle?.home;

  const headerData = source?.sections.find(
    (s: HomeSection): s is Header => s.sectionName === "headerSection"
  );

  const footerData = source?.sections.find(
    (s: HomeSection): s is FooterSection => s.sectionName === "footerSection"
  );

  const initialLoading = !bundle?.home || source;

  const primaryColor = source?.color?.primary || "#5D3222";
  const secondaryColor = source?.color?.secondary || "#fff";
  const neutralColor = source?.color?.neutral || "#F9F6F1";
  return (
    <>
      <SpawellHeader
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        neutralColor={neutralColor}
        data={headerData}
      />
      <CMSProvider initialBundle={bundle} initialLoading={initialLoading}>
        <main>{children}</main>
      </CMSProvider>
      <SpawellFooter
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        neutralColor={neutralColor}
        data={footerData}
      />
    </>
  );
}
