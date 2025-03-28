import React from "react";

export default function TopBar() {
  return (
    <>
      <div className="w-full h-[100px] flex items-center justify-center border-b border-primary-grey">
        <img src="/logo.svg" alt="Logo" className="h-[40px]" />
      </div>
      <div className="w-full h-[25px] md:h-[50px] bg-[url('/divider2.png')] bg-repeat" />
    </>
  );
}
