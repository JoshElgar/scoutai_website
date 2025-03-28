import React from "react";
import CrosshairCursor from "./CrosshairCursor";

interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative w-screen min-h-screen h-full bg-background">
      {/* <CrosshairCursor /> */}
      {/* top */}
      <div className="absolute top-[15px] sm:top-[30px] lg:top-[60px] left-0 right-0 h-[1px] bg-border" />
      {/* left */}
      <div className="absolute top-0 left-[10px] sm:left-[130px] lg:left-[160px] w-[1px] h-full bg-border" />

      {/* right */}
      <div className="absolute top-0 right-[10px] sm:right-[130px] lg:right-[160px] w-[1px] h-full bg-border" />

      {/* 2nd left line */}
      <div className="absolute top-0 left-[10px] sm:left-[130px] lg:left-[260px] w-[1px] h-full bg-border" />

      {/* 2nd right line */}
      <div className="absolute top-0 right-[10px] sm:right-[130px] lg:right-[260px] w-[1px] h-full bg-border" />

      {/* content*/}
      <div className="px-[15px] sm:px-[30px] lg:px-[260px] pt-[15px] sm:pt-[30px] lg:pt-[60px] flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
