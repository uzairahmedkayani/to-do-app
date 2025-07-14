import React from "react";
import BedtimeOutlinedIcon from "@mui/icons-material/BedtimeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";

export default function ModeChanger(props) {
  return (
    <>
      <div className="bg-[#6C63FF] text-white rounded-sm cursor-pointer h-[40px] w-auto p-2" onClick={props.onToggle}>
        {props.mode === "dark" ? (
          <WbSunnyOutlinedIcon />
        ) : (
          <BedtimeOutlinedIcon />
        )}
      </div>
    </>
  );
}
