import React from "react";
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

export default function FilterList({ value, onChange }) {
  return (
    <div className="relative w-fit">
      <select
        name="filter"
        className="appearance-none px-4 py-2 pr-10 bg-[#6C63FF] text-white rounded-sm h-[40px] cursor-pointer outline-none"
        value={value}
        onChange={e => onChange && onChange(e.target.value)}
      >
        <option
          value="ALL"
          className="bg-white text-[#6C63FF] outline-1 outline-[#6C63FF} font-bold"
        >
          All
        </option>
        <option
          value="Pending"
          className="bg-white text-[#6C63FF] outline-1 outline-[#6C63FF} font-bold"
        >
          Pending
        </option>
        <option
          value="Completed"
          className="bg-white text-[#6C63FF] outline-1 outline-[#6C63FF} font-bold"
        >
          Completed
        </option>
      </select>

      <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-white">
        <ExpandMoreOutlinedIcon fontSize="small" />
      </div>
    </div>
  );
}
