import React from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Youtube,
  Dribbble,
  Linkedin,
  Globe,
} from "lucide-react";
import { FaInstagram, FaThreads, FaXTwitter } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa";
import {
  FooterSection,
  SocialMediaLink,
} from "@/models/templates/collections/collections-home-model";
import { formatUrl } from "@/utils/StringFunctions";

const PLATFORM_ICON: Record<string, React.ElementType> = {
  instagram: FaInstagram,
  facebook: Facebook,
  linkedin: Linkedin,
  dribbble: Dribbble,
  twitter: FaXTwitter,
  youtube: Youtube,
  pinterest: FaPinterest,
  threads: FaThreads,
};

const CollectionsFooter = ({ data }: { data: FooterSection }) => {
  const content = data?.content;
  const normalize = (s?: string) => (s ?? "").trim();
  return (
    <footer className="bg-[#2D2D2D] text-white font-sans">
      <div className="mx-auto px-6 md:px-20 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Link href={"/"} className="h-16">
              <img
                src={
                  content?.logo ??
                  "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Group 1.svg"
                }
                alt="footer-logo"
                className="w-fit h-15 object-contain"
              />
            </Link>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            {content?.description}
          </p>
          <div className="flex items-center gap-5 text-gray-300">
            {content?.socialMedia?.map((each: SocialMediaLink, idx: number) => {
              const key = normalize(each.platform).toLowerCase();
              const Icon = PLATFORM_ICON[key] ?? Globe;
              const url = formatUrl(each.url) || "/";
              return (
                <Link href={url ?? "/"} key={key}>
                  <Icon className="size-5 hover:text-white transition-colors" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Pages Section */}
        <div className="md:pl-20">
          <h3 className="text-xl font-serif mb-6">Pages</h3>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-white transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/collections"
                className="hover:text-white transition-colors"
              >
                Collections
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-white transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-serif mb-6">Contact</h3>
          <div className="space-y-4 text-sm text-gray-400">
            <div className="flex items-start gap-3">
              <Phone className="size-4 mt-0.5 text-white shrink-0" />
              <div>
                <p>{content?.contact?.phoneNumber}</p>
                <p className="font-lora">{content?.contact?.timing}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="size-4 text-white shrink-0" />
              <p>{content?.contact?.email}</p>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="size-4 mt-0.5 text-white shrink-0" />
              <p className="leading-relaxed font-lora">
                {content?.contact?.location}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="md:px-20 mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <p className="font-lora">{content?.copyrightText}</p>
          <p>
            Made with ❤️ by{" "}
            <span className="text-white font-medium">
              <Link href={"https://communn.io/"}>communn.io</Link>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default CollectionsFooter;
