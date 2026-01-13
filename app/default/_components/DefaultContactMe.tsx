import React from 'react';
import Link from 'next/link';
import { Facebook, Github, Instagram, Send } from 'lucide-react';

const DefaultContactMe = () => {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-12 font-montserrat scroll-mt-[40px] md:scroll-mt-[90px]">
      {/* Section Heading */}
      <h2 className="text-2xl font-bold mb-8 text-black">Contact Me</h2>

      {/* Description Text */}
      <p className="text-gray-600 text-base leading-relaxed max-w-6xl mb-16">
        Lorem ipsum dolor sit amet consectetur. Sollicitudin cursus malesuada accumsan enim dictumst. 
        Massa at magna risus arcu tristique. Vel molestie interdum hac quam eget enim mi. Rhoncus purus 
        nullam purus fringilla sed blandit sed ac faucibus. At sollicitudin lorem at viverra euismod. 
        Lorem ipsum dolor sit amet consectetur. Sollicitudin cursus malesuada accumsan enim dictumst. 
        Massa at magna risus arcu tristique. Vel molestie interdum hac quam eget enim mi. Rhoncus purus 
        nullam purus fringilla sed blandit sed ac faucibus. At sollicitudin lorem at viverra euismod.
      </p>

      {/* Contact Details Grid */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 flex-grow">
          {/* Call Info */}
          <div>
            <h4 className="text-lg font-bold text-black mb-2">Call</h4>
            <p className="text-gray-600 text-lg">+91 90000 00000</p>
          </div>

          {/* Email Info */}
          <div>
            <h4 className="text-lg font-bold text-black mb-2">Email</h4>
            <p className="text-gray-600 text-lg">joy@gmail.com</p>
          </div>

          {/* Address Info */}
          <div>
            <h4 className="text-lg font-bold text-black mb-2">Address</h4>
            <p className="text-gray-600 text-lg">Bangalore</p>
          </div>
        </div>

        {/* Social Follow Links */}
        <div className="flex flex-col items-start md:items-end min-w-[200px]">
          <h4 className="text-lg font-bold text-black mb-2">Follow Us</h4>
          <div className="flex gap-4">
            {[
              { icon: <Facebook className="size-5" />, href: "#" },
              { icon: <Github className="size-5" />, href: "#" },
              { icon: <Send className="size-5" />, href: "#" },
              { icon: <Instagram className="size-5" />, href: "#" }
            ].map((social, idx) => (
              <Link 
                key={idx} 
                href={social.href}
                className="w-12 h-12 rounded-full bg-white shadow-md border border-gray-50 flex items-center justify-center text-gray-700 hover:text-black hover:shadow-lg transition-all"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DefaultContactMe;