"use client";

import React, { useState, useEffect } from "react";

export default function CrosshairCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {/* Vertical line */}
      <div
        className="absolute top-0 bottom-0 w-[1px] bg-border"
        style={{ left: `${mousePosition.x}px` }}
      />
      {/* Horizontal line */}
      <div
        className="absolute left-0 right-0 h-[1px] bg-border"
        style={{ top: `${mousePosition.y}px` }}
      />
    </div>
  );
}
