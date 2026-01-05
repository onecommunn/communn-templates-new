import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Youtube } from "lucide-react";
import { FaInstagram, FaThreads, FaXTwitter } from "react-icons/fa6";

const CollectionsFooter = () => {
  return (
    <footer className="bg-[#2D2D2D] text-white font-sans">
      <div className="mx-auto px-6 md:px-20 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Link href={"/"} className="h-16">
              <img
                src="https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Group 1.svg"
                alt="footer-logo"
                className="w-fit h-15 object-contain"
              />
            </Link>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            Vinutha Saree Verse began as a passionate dream woven from
            tradition, creativity and a deep love for Indian textiles.
          </p>
          <div className="flex items-center gap-5 text-gray-300">
            <Link href="#">
              <FaThreads className="size-5 hover:text-white transition-colors" />
            </Link>
            <Link href="#">
              <FaInstagram className="size-5 hover:text-white transition-colors" />
            </Link>
            <Link href="#">
              <Facebook className="size-5 hover:text-white transition-colors" />
            </Link>
            <Link href="#">
              <Youtube className="size-5 hover:text-white transition-colors" />
            </Link>
            <Link href="#">
              <FaXTwitter className="size-5 hover:text-white transition-colors" />
            </Link>
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
                <p>+91 7259253666</p>
                <p className="font-lora">Mon-Fri 09:00 – 09:00</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="size-4 text-white shrink-0" />
              <p>vinuthaprajwalco@gmail.com</p>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="size-4 mt-0.5 text-white shrink-0" />
              <p className="leading-relaxed font-lora">
                840, 6th main road, opposite to Sallapuradamma temple, D Group
                Society, Srigandada Kaval, Bengaluru, Karnataka.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="md:px-20 mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <p className="font-serif italic">
            ©Vinutha verse all rights Reserved
          </p>
          <p>
            Powered by{" "}
            <span className="text-white font-medium">
              <Link href={"https://communn.io/"}>Communn</Link>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default CollectionsFooter;
