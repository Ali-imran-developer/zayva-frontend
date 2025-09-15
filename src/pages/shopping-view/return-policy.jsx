import React from "react";

const ReturnPolicy = () => {
  const sections = [
    {
      title: "Returns & Exchanges:",
      items: [
        { text: "Return/exchange requests must be made within 7 days of delivery.", type: "success" },
        { text: "Items must be unused, unwashed, and in original packaging.", type: "success" },
        { text: "Sale items and custom-stitched products are non-returnable.", type: "error" },
      ],
    },
    {
      title: "Refunds:",
      description:
        "Once your return is approved and received, the refund will be processed within 7 business days to your original payment method.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 text-gray-700">
      <h1 className="text-3xl md:text-6xl font-semibold mb-6 text-black">
        Refund & Return Policy
      </h1>

      <p className="mb-6 text-base font-semibold text-gray-700 italic">
        We aim to ensure your satisfaction with every purchase. However, if
        you're not fully satisfied:
      </p>

      {sections.map((section, index) => (
        <div key={index} className="mb-6">
          <h2 className="font-bold text-gray-700 text-lg mb-3">{section.title}</h2>

          {section.items && (
            <ul className="space-y-2">
              {section.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span>
                    {item.type === "success" ? "✔️" : "❌"}
                  </span>
                  <span className="font-semibold text-gray-700 italic">{item.text}</span>
                </li>
              ))}
            </ul>
          )}

          {section.description && (
            <p className="text-base font-semibold italic text-gray-700 leading-relaxed">{section.description}</p>
          )}
        </div>
      ))}

      <p className="font-semibold italic">
        To initiate a return, email us at{" "}
        <span className="text-black font-semibold italic">[your support email]</span> with your order
        number and reason for return.
      </p>
    </div>
  );
};

export default ReturnPolicy;