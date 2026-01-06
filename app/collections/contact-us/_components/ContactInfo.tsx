import { MapPin, Phone, Mail, Globe } from "lucide-react";
import OmIcon from "../../_components/icons/OmIcon";


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
            <h4 className="font-figtree text-[24px] text-foreground mb-1">
                {title}
            </h4>
            {link ? (
                <a
                    href={link}
                    className="text-[#C09932] hover:text-gold-dark transition-colors font-figtree text-sm"
                >
                    {content}
                </a>
            ) : (
                <p className="text-[#C09932] text-sm font-figtree">{content}</p>
            )}
        </div>
    </div>
);

const ContactInfo = () => {
    return (
        <div className="flex-1">
            <OmIcon size={60} />
            <h2 className="font-kalnia text-3xl md:text-4xl text-foreground my-4">
                Speak With Us
            </h2>
            <p className="text-muted-foreground font-figtree text-sm mb-8 max-w-md">
                Visit us at our studio in Bengaluru for a closer look at our collections. Call or WhatsApp us for quick assistance during business hours.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ContactItem
                    icon={
                        <div className="w-14 h-14 flex items-center justify-center rounded-full border border-[#C9B9A5]">
                            <MapPin size={24} />
                        </div>
                    }
                    title="Store Address"
                    content="840, 6th Main Road, Opposite To Sallapuradamma Temple, D Group Society, Bengaluru."
                />
                <ContactItem
                    icon={
                        <div className="w-14 h-14 flex items-center justify-center rounded-full border border-[#C9B9A5]">
                            <Phone size={24} />
                        </div>
                    }

                    title="Call Us"
                    content="+91 7259253666"
                    link="tel:+917259253666"
                />
                <ContactItem
                    icon={
                        <div className="w-14 h-14 flex items-center justify-center rounded-full border border-[#C9B9A5]">
                            <Mail size={26} />
                        </div>
                    }

                    title="Mail Us"
                    content="vinuthaprajwalco@gmail.com"
                    link="mailto:vinuthaprajwalco@gmail.com"
                />
                <ContactItem

                    icon={
                        <div className="w-14 h-14 flex items-center justify-center rounded-full border border-[#C9B9A5]">
                            <Globe size={24} />
                        </div>
                    }
                    title="WEBSITE"
                    content="vinuthaverse.com"
                    link="https://vinuthaverse.com"
                />
            </div>
        </div>
    );
};

export default ContactInfo;