import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { faqsData } from "@/data/faq-data";

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="max-w-3xl w-full mx-auto py-10">
      <h2 className="text-4xl font-bold text-center mb-6">FAQs</h2>
      {faqsData?.map((faq, index) => (
        <div key={index} className="border-b border-gray-700 mb-2">
          <button onClick={() => toggleFAQ(index)} className="w-full text-left px-4 py-3 bg-black text-white font-medium focus:outline-none flex justify-between items-center">
            {faq?.question}
            <span>{activeIndex === index ? <ChevronUp /> : <ChevronDown />}</span>
          </button>

          <AnimatePresence initial={false}>
            {activeIndex === index && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-4 py-3 bg-black text-gray-200">
                  {faq?.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default FAQs;