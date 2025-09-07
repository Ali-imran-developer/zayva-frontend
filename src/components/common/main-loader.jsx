import { motion } from "framer-motion";

const MainLoader = ({ className = "bg-black" }) => {

  return (
    <div className="flex items-center justify-center w-full" style={{ height: "calc(100vh - 1px)" }}>
      <motion.div
        className={`w-4 h-4 rounded-full ${className}`}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className={`w-4 h-4 rounded-full mx-2 ${className}`}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2,
        }}
      />

      <motion.div
        className={`w-4 h-4 rounded-full ${className}`}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4,
        }}
      />
    </div>
  );
};

export default MainLoader;