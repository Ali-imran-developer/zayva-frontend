import React from "react";

const PrivacyPolicy = () => {

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 text-gray-700">
      <h1 className="text-3xl md:text-6xl font-semibold mb-10 text-black">
        Privacy Policy
      </h1>

      <div className="space-y-4 text-base leading-relaxed font-semibold capitalize text-gray-700">
        <p className="italic">
          We value your privacy and are committed to protecting your personal
          information. When you shop at Meeras, your data is handled securely
          and only used for order processing, customer service, and marketing
          (with your consent).
        </p>

        <p className="italic">
          We do not sell, rent, or share your data with any third party, except
          as required by law or for trusted services like payment gateways and
          shipping partners.
        </p>

        <p className="italic">
          Your information, such as name, email, address, and payment details,
          is stored securely and only accessible by authorized personnel.
        </p>

        <p className="italic">
          If you have questions about your data or want it removed, please
          contact us at <span className="font-bold text-gray-800">[your support email]</span>.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;