import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="searchbar w-[65%] relative">
      <input
        type="text"
        placeholder="Search note..."
        className="w-full px-[16px] py-[8px] outline-1 outline-[#6C63FF] rounded-sm pr-10"
        value={value}
        onChange={onChange}
      />
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6C63FF] cursor-pointer">
        <SearchOutlinedIcon />
      </span>
    </div>
  );
}
