import { MapPin, Phone, Mail, Globe } from "lucide-react";
import OmIcon from "../../_components/icons/OmIcon";
import { ContactInfoSection } from "@/models/templates/collections/collections-contact-model";

interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  link?: string;
}

const ContactItem = ({ icon, title, content, link }: ContactItemProps) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0 text-foreground">{icon}</div>
    <div>
      <h4 className="font-figtree text-[24px] text-foreground mb-1">{title}</h4>
      {link ? (
        <a
          href={link}
          className="text-[var(--pri)] hover:text-gold-dark transition-colors font-figtree text-sm"
        >
          {content}
        </a>
      ) : (
        <p className="text-[var(--pri)] text-sm font-figtree">{content}</p>
      )}
    </div>
  </div>
);

const ContactInfo = ({
  data,
  primaryColor,
}: {
  data: ContactInfoSection;
  primaryColor: string;
}) => {
  const content = data?.content;
  return (
    <div
      className="flex-1"
      style={
        {
          "--pri": primaryColor,
        } as React.CSSProperties
      }
    >
      <OmIcon size={60} color={primaryColor} />
      <h2 className="font-kalnia text-2xl md:text-3xl text-foreground my-4">
        {content.heading}
      </h2>
      <p className="text-muted-foreground font-figtree text-sm mb-8 max-w-md">
        {content?.description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContactItem
          icon={
            <div className="w-14 h-14 flex items-center justify-center rounded-full border border-[#C9B9A5]">
              <MapPin size={24} />
            </div>
          }
          title="Store Address"
          content={content?.contact?.location}
        />
        <ContactItem
          icon={
            <div className="w-14 h-14 flex items-center justify-center rounded-full border border-[#C9B9A5]">
              <Phone size={24} />
            </div>
          }
          title="Call Us"
          content={content?.contact?.phoneNumber}
          link={`tel:${content?.contact?.phoneNumber}`}
        />
        <ContactItem
          icon={
            <div className="w-14 h-14 flex items-center justify-center rounded-full border border-[#C9B9A5]">
              <Mail size={26} />
            </div>
          }
          title="Mail Us"
          content={content?.contact?.email}
          link={`mailto:${content?.contact?.email}`}
        />
        <ContactItem
          icon={
            <div className="w-14 h-14 flex items-center justify-center rounded-full border border-[#C9B9A5]">
              <Globe size={24} />
            </div>
          }
          title="WEBSITE"
          content={content?.contact?.website}
          link={content?.contact?.website}
        />
      </div>
    </div>
  );
};

export default ContactInfo;
