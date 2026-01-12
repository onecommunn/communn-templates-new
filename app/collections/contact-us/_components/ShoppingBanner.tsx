import Link from "next/link";
import OmIcon from "../../_components/icons/OmIcon";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/models/templates/collections/collections-contact-model";

const ShoppingBanner = ({
  data,
  primaryColor,
}: {
  data: CTASection;
  primaryColor: string;
}) => {
  const content = data?.content;
  const heroBanner =
    content?.media ??
    "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/e8d2b17c3c74b1c59171a29835110696cf358944.jpg";

  return (
    <section
      className="relative h-[500px] md:h-[400px] w-full overflow-hidden"
      style={
        {
          "--pri": primaryColor,
        } as React.CSSProperties
      }
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <div className="absolute inset-0 bg-foreground/40" />
      </div>
      <div className="relative flex h-full flex-col items-center justify-center text-center px-4">
        <OmIcon size={60} color={"#fff"} />
        <h2 className="font-kalnia text-2xl md:text-3xl lg:text-5xl text-[#ffffff] mb-4 ">
          {content?.heading}
        </h2>
        <p className="text-primary-foreground/80 font-figtree text-sm md:text-base max-w-xl mb-8">
          {content?.description}
        </p>
        <Link href={content?.buttons?.url}>
          <Button className="bg-[var(--pri)] rounded-none border-none hover:bg-gold-dark text-primary-foreground font-figtree px-8">
            {content?.buttons?.label}
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ShoppingBanner;
