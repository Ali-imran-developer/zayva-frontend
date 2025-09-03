import React from "react";

const SearchInput = () => {
  return (
    <div style={{ position: "relative", width: "250px" }}>
      <input type="text" placeholder="Search"
        style={{ width: "100%", padding: "8px 32px 8px 0", border: "none", borderBottom: "1px solid black", outline: "none", fontSize: "16px" }}
      />
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        style={{ position: "absolute", right: "0", top: "50%", transform: "translateY(-50%)", width: "25px", height: "25px", cursor: "pointer",}}>
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </div>
  );
};

export default SearchInput;