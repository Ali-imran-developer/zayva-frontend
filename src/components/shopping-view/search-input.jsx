// import { useState, useEffect, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "@/hooks/useAuth";
// import { useSelector } from "react-redux";

// function useDebounce(value, delay) {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     const handler = setTimeout(() => setDebouncedValue(value), delay);
//     return () => clearTimeout(handler);
//   }, [value, delay]);

//   return debouncedValue;
// }

// const SearchInput = () => {
//   const [query, setQuery] = useState("");
//   const [open, setOpen] = useState(false);
//   const debouncedQuery = useDebounce(query, 400);
//   const navigate = useNavigate();
//   const { handleGetSearch } = useAuth();
//   const { searchData } = useSelector((state) => state.Auth);

//   const fetchResults = useCallback(async (value) => {
//     console.log("values", value);
//     try {
//       await handleGetSearch(value);
//       setOpen(true);
//     } catch (err) {
//       console.error("Search API error:", err);
//     }
//   }, []);

//   useEffect(() => {
//     fetchResults(debouncedQuery);

//   }, [debouncedQuery, fetchResults]);

//   const handleSelect = (product) => {
//     setOpen(false);
//     setQuery("");
//     navigate(`/shop/listing/${product?._id}`);
//   };
//   console.log("searchData", searchData);

//   return (
//     <div className="relative w-full">
//       <input
//         type="text"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         placeholder="Search products..."
//         className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//       />

//       <AnimatePresence className="max-w-5xl w-full">
//         {open && searchData?.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.3 }}
//             style={{ width: "400px" }}
//             className="absolute max-w-5xl w-full right-0 mt-2 rounded-md bg-white shadow-xl border border-gray-200 z-50"
//           >
//             <ul className="divide-y divide-gray-100">
//               {searchData?.map((product) => (
//                 <li key={product?._id} onClick={() => handleSelect(product)} className="p-4 cursor-pointer hover:bg-gray-50">
//                   <div className="flex items-center gap-3">
//                     <img
//                       src={product?.images[0] ?? ""}
//                       alt={product?.title ?? 0}
//                       className="w-14 h-14 rounded-lg object-contain border border-gray-400"
//                     />
//                     <div>
//                       <p className="text-gray-900 font-medium text-sm">{product?.title ?? 0}</p>
//                       <p className="text-gray-500 text-sm">Rs. {product?.price ?? 0}</p>
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default SearchInput;


// import { useState, useEffect, useCallback, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "@/hooks/useAuth";
// import { useSelector } from "react-redux";

// function useDebounce(value, delay) {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     const handler = setTimeout(() => setDebouncedValue(value), delay);
//     return () => clearTimeout(handler);
//   }, [value, delay]);

//   return debouncedValue;
// }

// const SearchInput = () => {
//   const [query, setQuery] = useState("");
//   const [open, setOpen] = useState(false);
//   const debouncedQuery = useDebounce(query, 400);
//   const navigate = useNavigate();
//   const { handleGetSearch } = useAuth();
//   const { searchData } = useSelector((state) => state.Auth);
//   const wrapperRef = useRef(null);

//   const fetchResults = useCallback(async (value) => {
//     if (!value) {
//       setOpen(false);
//       return;
//     }
//     try {
//       await handleGetSearch(value);
//       setOpen(true);
//     } catch (err) {
//       console.error("Search API error:", err);
//     }
//   }, []);

//   useEffect(() => {
//     fetchResults(debouncedQuery);
//   }, [debouncedQuery, fetchResults]);

//   const handleSelect = (product) => {
//     setOpen(false);
//     setQuery("");
//     navigate(`/shop/listing/${product?._id}`);
//   };

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
//         setOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div ref={wrapperRef} style={{ position: "relative", width: "250px" }}>
//       <input
//         type="text"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         placeholder="Search"
//         style={{
//           width: "100%",
//           padding: "8px",
//           border: "none",
//           borderBottom: "1px solid black",
//           outline: "none",
//           fontSize: "16px",
//         }}
//       />
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         style={{
//           position: "absolute",
//           right: "4px",
//           top: "50%",
//           transform: "translateY(-50%)",
//           width: "25px",
//           height: "25px",
//           cursor: "pointer",
//         }}
//       >
//         <circle cx="11" cy="11" r="8"></circle>
//         <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
//       </svg>

//       <AnimatePresence>
//         {open && searchData?.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.3 }}
//             style={{ width: "400px" }}
//             className="absolute max-w-5xl w-full right-0 mt-2 rounded-md bg-white shadow-xl border border-gray-200 z-50"
//           >
//             <ul className="divide-y divide-gray-100">
//               {searchData?.map((product) => (
//                 <li
//                   key={product?._id}
//                   onClick={() => handleSelect(product)}
//                   className="p-4 cursor-pointer hover:bg-gray-50"
//                 >
//                   <div className="flex items-center gap-3">
//                     <img
//                       src={product?.images[0] ?? ""}
//                       alt={product?.title ?? ""}
//                       className="w-14 h-14 rounded-lg object-contain border border-gray-400"
//                     />
//                     <div>
//                       <p className="text-gray-900 font-medium text-sm">{product?.title ?? ""}</p>
//                       <p className="text-gray-500 text-sm">Rs. {product?.price ?? 0}</p>
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default SearchInput;

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useSelector } from "react-redux";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

const SearchInput = () => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 400);
  const navigate = useNavigate();
  const { handleGetSearch } = useAuth();
  const { searchData } = useSelector((state) => state.Auth);
  const wrapperRef = useRef(null);

  const fetchResults = useCallback(async (value) => {
    if (!value) {
      setOpen(false);
      return;
    }
    try {
      await handleGetSearch(value);
      setOpen(true);
    } catch (err) {
      console.error("Search API error:", err);
    }
  }, []);

  useEffect(() => {
    fetchResults(debouncedQuery);
  }, [debouncedQuery, fetchResults]);

  const handleSelect = (product) => {
    setOpen(false);
    setQuery("");
    navigate(`/shop/listing/${product?._id}`);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    
    // Use 'click' instead of 'mousedown' to ensure proper event ordering
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} style={{ position: "relative", width: "250px" }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
        style={{
          width: "100%",
          padding: "8px",
          border: "none",
          borderBottom: "1px solid black",
          outline: "none",
          fontSize: "16px",
        }}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          position: "absolute",
          right: "4px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "25px",
          height: "25px",
          cursor: "pointer",
        }}
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>

      <AnimatePresence>
        {open && searchData?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{ width: "400px" }}
            className="absolute max-w-5xl w-full right-0 mt-2 rounded-md bg-white shadow-xl border border-gray-200 z-50"
            // Prevent event bubbling when clicking inside the dropdown
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="divide-y divide-gray-100">
              {searchData?.map((product) => (
                <li
                  key={product?._id}
                  onClick={() => handleSelect(product)}
                  className="p-4 cursor-pointer hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product?.images[0] ?? ""}
                      alt={product?.title ?? ""}
                      className="w-14 h-14 rounded-lg object-contain border border-gray-400"
                    />
                    <div>
                      <p className="text-gray-900 font-medium text-sm">{product?.title ?? ""}</p>
                      <p className="text-gray-500 text-sm">Rs. {product?.price ?? 0}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SearchInput;