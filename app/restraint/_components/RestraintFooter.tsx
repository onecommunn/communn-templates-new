"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  MapPin,
  Phone,
  Mail,
  Youtube,
} from "lucide-react";
import { FaPinterest } from "react-icons/fa";

export default function RestraintFooter() {
  return (
    <footer className="relative bg-[#303B31] text-[#D6D9D1] font-sora overflow-hidden">
      <div className="inset-0 pointer-events-auto">
        <Image
          src={"/assets/restraint-footer-bg-image.svg"}
          alt="restraint-footer-bg-image"
          width={800}
          height={300}
          className="absolute -left-75 -bottom-10"
        />
        <Image
          src={"/assets/restraint-footer-bg-image.svg"}
          alt="restraint-footer-bg-image"
          width={800}
          height={300}
          className="absolute -right-80 -bottom-10"
        />
      </div>
      {/* top divider line */}
      <div className="mx-auto h-px w-full max-w-7xl bg-white/10" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Brand + tagline */}
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/restraint-logo.png"
              alt="logo"
              width={150}
              height={18}
              className="object-contain"
              unoptimized
            />

            <hr className="h-8 border border-white/40" />

            <p className="max-w-2xl text-sm text-[#C2C6BC]">
              Holistic practices for inner peace, focus, and overall well-being.
            </p>
          </div>
          {/* Socials */}
          <div className="mt-6 flex items-center gap-3">
            <Social
              icon={<FaPinterest className="h-4 w-4" />}
              label="Pinterest"
              href="#"
            />
            <Social
              icon={<Youtube className="h-4 w-4" />}
              label="Youtube"
              href="#"
            />
            <Social
              icon={<Facebook className="h-4 w-4" />}
              label="Facebook"
              href="#"
            />
            <Social
              icon={<Instagram className="h-4 w-4" />}
              label="Instagram"
              href="#"
            />
          </div>
        </div>

        <div className="my-8 h-px w-full bg-white/10" />

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Quick Link */}
          <nav aria-label="Quick Link" className="space-y-4">
            <h3 className="text-xl tracking-wider text-[#EAEDE6] font-marcellus">
              Quick Link
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "About us", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Blogs", href: "/blog" },
              ].map((i) => (
                <li key={i.label}>
                  <Link
                    href={i.href}
                    className="transition-colors hover:text-white text-sm"
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Services" className="space-y-4">
            <h3 className="text-xl tracking-wider text-[#EAEDE6] font-marcellus">
              Services
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                "Beginner Yoga Classes",
                "Stress Relief Sessions",
                "Mindful Meditation",
                "Restorative Yoga",
              ].map((s) => (
                <li key={s} className="transition-colors hover:text-white">
                  {s}
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-xl tracking-wider text-[#EAEDE6] font-marcellus">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 opacity-80" />
                <span>(0) - 0761-852-398</span>
              </li>
              <li className="flex items-start gap-3 break-all">
                <Mail className="mt-0.5 h-4 w-4 opacity-80" />
                <span>info@domainname.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 opacity-80" />
                <div>
                  123 High Street LN1 1AB
                  <br />
                  United Kingdom
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 h-px w-full bg-white/10" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col-reverse items-start justify-between gap-4 text-xs text-[#B9BFB3] sm:flex-row">
          <p>Copyright © {new Date().getFullYear()} All Rights Reserved.</p>

          <p> Made with ❤️ by communn.io</p>
        </div>
      </div>
    </footer>
  );
}

function Social({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) {
  return (
    <Link
      aria-label={label}
      href={href}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#AEA17E] text-white/90 transition hover:bg-[#AEA17E]/60"
    >
      {icon}
    </Link>
  );
}
