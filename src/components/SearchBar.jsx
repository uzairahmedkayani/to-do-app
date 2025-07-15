import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export default function SearchBar({ value, onChange, mode }) {
  const darkstyle = {
    outline: "1px solid #fff",
    color: "#fff",
  };
  return (
    <div className="searchbar w-[65%] relative">
      <input
        type="text"
        placeholder="Search note..."
        className={`w-full px-[16px] py-[8px] outline-1 rounded-sm pr-10 ${
          mode === "dark"
            ? "outline-white text-white bg-[#252525] placeholder-gray-300"
            : "outline-[#6C63FF] text-black"
        }`}
        value={value}
        onChange={onChange}
      />
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white cursor-pointer">
        <SearchOutlinedIcon />
      </span>
    </div>
  );
}
