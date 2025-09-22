import { Dribbble, Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ICreatorFooter {
  logoUrl: string;
  logoWidth: number;
  logoHight: number;
}

const NavigateList = [
  // {
  //   name: "Courses",
  //   href: "/",
  // },
  {
    name: "Events",
    href: "/events",
  },
  {
    name: "Plans",
    href: "/plans",
  },
  {
    name: "About",
    href: "/about",
  },
  // {
  //   name: "Appointments",
  //   href: "/appointments",
  // },
];

const OtherLinksList = [
  {
    name: "Privacy Policy",
    href: "/",
  },
  {
    name: "Terms & Conditions",
    href: "/",
  },
  {
    name: "FAQ’s",
    href: "/",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

const socialMediaLinks = [
  {
    icon: Facebook,
    href: "/",
  },
  {
    icon: Instagram,
    href: "/",
  },
  {
    icon: Linkedin,
    href: "/",
  },
  {
    icon: Dribbble,
    href: "/",
  },
];

const CreatorFooter = ({ logoUrl, logoHight, logoWidth }: ICreatorFooter) => {
  return (
    <footer className="py-10 font-inter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex flex-col  md:flex-row justify-center md:justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 justify-center md:justify-start"
          >
            <img
              src={
                logoUrl ||
                "https://cdn.builder.io/api/v1/image/assets%2F228d3b2c4554432dbdd1f0f27ee6ba7c%2F062e0f3cd667449793b24103817a0704"
              }
              alt={"logo"}
              width={logoWidth}
              height={logoHight || 300}
            />
          </Link>
          <div className="grid grid-cols-2 mx-16 md:mx-0">
            <div className="flex flex-col gap-3">
              <p className="text-xs">Navigate</p>
              {NavigateList.map((item, idx) => (
                <Link key={idx} href={item.href}>
                  <p className="text-sm font-semibold">{item.name}</p>
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-xs">Company</p>
              {OtherLinksList.map((item, idx) => (
                <Link key={idx} href={item.href}>
                  <p className="text-sm font-semibold">{item.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex flex-col md:flex-row justify-center gap-2 md:justify-between">
          <div className="flex flex-row items-center gap-4 justify-center md:justify-start">
            {socialMediaLinks.map((each, idx) => {
              const Icon = each.icon;
              return (
                <Link href={each.href} key={idx}>
                  <Icon className="w-5 h-5" />
                </Link>
              );
            })}
            <Link href={"/"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
              </svg>
            </Link>
          </div>
          <p className="text-[#0C0407] text-sm text-center md:text-left">
            ©prachiandharsh., All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default CreatorFooter;
