"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

export default function TopBar() {
  const pathAnimationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    // Initialize the path animation
    pathAnimationRef.current = gsap.to("#tracingDot", {
      duration: 3,
      ease: "none",
      repeat: -1,
      motionPath: {
        path: "#logoPath",
        align: "#logoPath",
        autoRotate: true,
        alignOrigin: [0.5, 0.5],
      },
    });
  }, []);

  return (
    <>
      <div className="w-full h-[100px] flex items-center justify-center border-b border-primary-grey relative">
        <img src="/logo.svg" alt="Logo" className="h-[40px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[40px]">
          <svg>
            <path id="logoPath" d="M0,0" fill="none" stroke="transparent" />
            <circle id="tracingDot" r="2" fill="red" />
          </svg>
        </div>
      </div>
      <div className="w-full h-[25px] md:h-[50px] bg-[url('/divider2.png')] bg-repeat" />
    </>
  );
}
