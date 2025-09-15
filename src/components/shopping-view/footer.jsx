import { contactInfo, customerCareLinks, ismailApperalLinks } from "@/data/footer-data";
import React from "react";

const Footer = () => {

  return (
    <>
      <footer className="bg-black text-white pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <img src="/meeras-footer-logo.png" alt="Footer Logo" className="w-28 h-14 mb-6" />
            <ul className="space-y-3">
              {ismailApperalLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 tracking-wide">
              CUSTOMER CARE
            </h3>
            <ul className="space-y-3">
              {customerCareLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 tracking-wide">
              REACH US!
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-white font-semibold text-lg mb-2">
                  Address:
                </p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {contactInfo.address}
                </p>
              </div>
              <div>
                <p className="text-white font-semibold text-lg mb-2">
                  Phone:
                </p>
                <a href={`tel:${contactInfo.phone}`} className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  {contactInfo.phone}
                </a>
              </div>
              <div>
                <p className="text-white font-semibold text-lg mb-2">
                  Email:
                </p>
                <a href={`mailto:${contactInfo.email}`} className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  {contactInfo.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;