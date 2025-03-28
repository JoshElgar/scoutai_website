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
        path: "#motionPath",
        align: "#motionPath",
        autoRotate: true,
        alignOrigin: [0.5, 0.5],
      },
    });
  }, []);

  return (
    <>
      <div className="w-full h-[100px] flex items-center justify-center border-b border-primary-grey relative">
        <div className="relative">
          <svg
            width="83"
            height="95"
            viewBox="0 0 83 95"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-[40px]"
          >
            <path
              d="M40.6586 69.5458H0V28.8872L40.6586 69.5458Z"
              fill="#170F15"
              id="motionPath"
            />
            <path
              d="M41.0647 69.8363H81.9443V28.9567L41.0647 69.8363Z"
              fill="#170F15"
            />
            <path
              d="M28.125 0.137208L0 28.8872L28.125 57.6372L28.125 0.137208Z"
              fill="#170F15"
            />
            <path
              d="M53.125 0.137207L82.0312 29.0435L53.125 57.9497L53.125 0.137207Z"
              fill="#170F15"
            />
            <path
              d="M3.85938 94.2876V91.5376H12.1094V94.2876H3.85938ZM1.10938 91.5376V88.7876H3.85938V91.5376H1.10938ZM12.1094 91.5376V86.0376H14.8594V91.5376H12.1094ZM3.85938 86.0376V83.2876H12.1094V86.0376H3.85938ZM1.10938 83.2876V80.5376H3.85938V83.2876H1.10938ZM3.85938 80.5376V77.7876H14.8594V80.5376H3.85938ZM20.3594 94.2876V91.5376H28.6094V94.2876H20.3594ZM28.6094 91.5376V88.7876H31.3594V91.5376H28.6094ZM17.6094 91.5376V80.5376H20.3594V91.5376H17.6094ZM28.6094 83.2876V80.5376H31.3594V83.2876H28.6094ZM20.3594 80.5376V77.7876H28.6094V80.5376H20.3594ZM36.8594 94.2876V91.5376H45.1094V94.2876H36.8594ZM34.1094 91.5376V80.5376H36.8594V91.5376H34.1094ZM45.1094 91.5376V80.5376H47.8594V91.5376H45.1094ZM36.8594 80.5376V77.7876H45.1094V80.5376H36.8594ZM50.6094 91.5376V77.7876H53.3594V91.5376H50.6094ZM53.3594 94.2876V91.5376H61.6094V77.7876H64.3594V94.2876H53.3594ZM72.6094 94.2876V91.5376H78.1094V94.2876H72.6094ZM69.8594 91.5376V80.5376H67.1094V77.7876H69.8594V75.0376H72.6094V77.7876H78.1094V80.5376H72.6094V91.5376H69.8594Z"
              fill="black"
            />
            <circle id="tracingDot" r="2" fill="red" />
          </svg>
        </div>
      </div>
      <div className="w-full h-[25px] md:h-[50px] bg-[url('/divider2.png')] bg-repeat" />
    </>
  );
}
