import { Facebook, Instagram, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";

const PhotographyFooter = () => {
  return (
    <footer className="bg-[#1a1a1a] border-t border-[#2e2e2e]">
      <div className="container mx-auto px-4 md:px-20 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <img
              src="https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/vijju-logo (1).png"
              alt="Vijay Photography"
              className="h-16 mb-4"
            />
            <p className="text-[#8c8c8c] font-raleway text-sm leading-relaxed mb-4">
              Your Legacy, Through Our Lens
            </p>
            <div className="space-y-2">
              {" "}
              <div className="flex items-start gap-2 text-[#8c8c8c] font-raleway text-sm">
                <MapPin
                  size={16}
                  className="mt-0.5 flex-shrink-0 text-[#E0A24D]"
                />
                <span>
                  Main Branch: Dharmashala Road, Near Megha Lodge, Chitradurga
                  577501
                </span>
              </div>
              <div className="flex items-start gap-2 text-[#8c8c8c] font-raleway text-sm">
                <MapPin
                  size={16}
                  className="mt-0.5 flex-shrink-0 text-[#E0A24D]"
                />
                <span>
                  Branch: Near Ayyappa Swamy Temple, B.I.E.T College Road,
                  Davanagere 577004
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-raleway text-lg font-semibold text-[#EFECE7] mb-4">
              Quick Links
            </h4>

            <div className="flex flex-col gap-2">
              {[
                "Home",
                "About",
                "Services",
                "Packages",
                "Portfolio",
                "Contact",
              ].map((link) => (
                <Link
                  key={link}
                  href={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                  className="text-[#8c8c8c] hover:text-[#E0A24D] transition-colors font-raleway text-sm"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-raleway text-lg font-semibold text-[#EFECE7] mb-4">
              Get in Touch
            </h4>

            <div className="space-y-2 mb-4">
              <a
                href="tel:+917022779616"
                className="flex items-center gap-2 text-[#8c8c8c] hover:text-[#E0A24D] transition-colors font-raleway text-sm"
              >
                <Phone size={14} /> 7022779616
              </a>

              <a
                href="tel:+919606177802"
                className="flex items-center gap-2 text-[#8c8c8c] hover:text-[#E0A24D] transition-colors font-raleway text-sm"
              >
                <Phone size={14} /> 9606177802
              </a>
            </div>

            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full border border-[#2e2e2e] flex items-center justify-center text-[#8c8c8c] hover:text-[#E0A24D] hover:border-[#E0A24D] transition-colors"
              >
                <Facebook size={18} />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full border border-[#2e2e2e] flex items-center justify-center text-[#8c8c8c] hover:text-[#E0A24D] hover:border-[#E0A24D] transition-colors"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#2e2e2e] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[#8c8c8c] font-raleway text-xs tracking-wide">
            © {new Date().getFullYear()} Vijay Photography. All rights reserved.
          </p>

          <Link
            href="/terms"
            className="text-[#8c8c8c] hover:text-[#E0A24D] transition-colors font-raleway text-xs tracking-wide"
          >
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default PhotographyFooter;
