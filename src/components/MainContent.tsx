"use client";

import React, { useState, useEffect, useRef } from "react";
import * as Tone from "tone";
import DividerLine from "./DividerLine";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// Register the GSAP plugin
gsap.registerPlugin(MotionPathPlugin);

export default function MainContent() {
  const [currentScroll, setCurrentScroll] = useState(0);
  const [documentHeight, setDocumentHeight] = useState(0);
  const playerRef = useRef<Tone.Player | null>(null);
  const pathAnimationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    // Initialize Tone player
    playerRef.current = new Tone.Player({
      url: "/click.mp3",
      autostart: false,
      // retrigger: true,
      volume: -25,
    }).toDestination();

    // Set initial document height
    setDocumentHeight(document.documentElement.scrollHeight);

    const handleScroll = () => {
      setCurrentScroll(Math.floor(window.scrollY));

      // Update the path animation progress based on scroll position
      if (pathAnimationRef.current) {
        // Calculate progress (0 to 1) based on scroll position
        const scrollHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(
          1,
          Math.max(0, window.scrollY / scrollHeight)
        );
        pathAnimationRef.current.progress(progress);
      }
    };

    const handleResize = () => {
      setDocumentHeight(document.documentElement.scrollHeight);
    };

    // Initialize the path animation
    pathAnimationRef.current = gsap.to("#dot", {
      duration: 1,
      ease: "none",
      paused: true, // Start paused so we can control with scroll
      motionPath: {
        path: "#motionPath",
        align: "#motionPath",
        autoRotate: true,
        alignOrigin: [0.5, 0.5],
      },
    });

    // Footer coordinates animation
    const coordinatesElement = document.getElementById("coordinates");
    if (coordinatesElement) {
      // Scramble text effect for coordinates
      gsap.to(coordinatesElement, {
        duration: 1,
        ease: "power1.inOut",
        onUpdate: function () {
          if (Math.random() > 0.7) {
            coordinatesElement.textContent = `LAT: ${scrambleCoordinates(
              "38°52′15″N"
            )} LON: ${scrambleCoordinates("77°3′21″W")}`;
          }
        },
        repeat: -1,
        repeatDelay: 0,
      });
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      playerRef.current?.dispose();
      if (pathAnimationRef.current) {
        pathAnimationRef.current.kill();
      }
    };
  }, []);

  const handleHover = async (e: React.MouseEvent<HTMLElement>) => {
    // e.preventDefault();
    await Tone.start();
    if (playerRef.current?.loaded) {
      playerRef.current.start();
    }
  };

  // Function to scramble coordinate text for the military effect
  const scrambleCoordinates = (coord: string) => {
    const chars = coord.split("");
    const scrambledChars = chars.map((char) => {
      if (char.match(/[0-9]/) && Math.random() > 0.5) {
        return Math.floor(Math.random() * 10).toString();
      }
      return char;
    });
    return scrambledChars.join("");
  };

  return (
    <div className="w-full flex flex-col items-center gap-1 py-4">
      {/* Reusable component for scroll markers */}
      {[
        {
          position: "left",
          className: "left-[10px] sm:left-[130px] lg:left-[260px]",
        },
        {
          position: "right",
          className: "right-[10px] sm:right-[130px] lg:right-[260px]",
        },
      ].map(({ position, className }) => (
        <div
          key={position}
          className={`absolute top-0 ${className} w-[1px] h-full bg-border`}
        >
          {documentHeight > 0 &&
            Array.from({
              length: Math.ceil(documentHeight / 50) - 6,
            }).map((_, i) => {
              const scrollValue = i * 50;
              const isCurrentScroll =
                currentScroll >= scrollValue &&
                currentScroll < scrollValue + 50;
              const isLeft = position === "left";

              return (
                <div
                  key={i}
                  className={`absolute ${isLeft ? "left" : "right"}-[-40px] ${
                    isLeft ? "right" : "left"
                  }-0 flex justify-${
                    isLeft ? "end" : "start"
                  } items-center w-[40px]`}
                  style={{ top: `${scrollValue + 200}px` }}
                >
                  {isLeft && (
                    <span
                      className={`text-xs mr-2 text-right transition-colors duration-200 ${
                        isCurrentScroll ? "text-black font-bold" : "text-border"
                      }`}
                    >
                      {scrollValue}
                    </span>
                  )}
                  <div
                    className={`w-[10px] h-[1px] transition-colors duration-200 ${
                      isCurrentScroll ? "bg-black" : "bg-border"
                    }`}
                  />
                  {!isLeft && (
                    <span
                      className={`text-xs ml-2 text-left transition-colors duration-200 ${
                        isCurrentScroll ? "text-black font-bold" : "text-border"
                      }`}
                    >
                      {scrollValue}
                    </span>
                  )}
                </div>
              );
            })}
        </div>
      ))}
      {/* </div> */}

      {/* Title with Pokemon Pixel Font */}
      <p className="text-3xl md:text-3xl lg:text-3xl font-bold text-center uppercase font-pokemon-pixel select-none">
        Autonomous Control Systems
      </p>

      <div className="w-full h-[500px] bg-black relative flex items-center justify-center my-8 select-none cursor-pointer">
        <img
          src="/vehicle.png"
          alt="Vehicle"
          className="absolute w-full h-full object-cover opacity-70"
        />
        <p className="text-8xl font-digitaltech text-white text-center uppercase z-10">
          SCOUT
        </p>
      </div>
      <div className="w-full px-4">
        <DividerLine text="Use Cases" />
      </div>

      {/* Grid of images - responsive from 1x4 on desktop to 2x2 on smaller screens */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-2 px-4">
        {[
          { src: "/sand.png", alt: "Search + Rescue" },
          { src: "/soldier.png", alt: "Reconnaissance" },
          { src: "/soldiersand.png", alt: "Tactical Support" },
          { src: "/supply.png", alt: "Supply Transport" },
        ].map((image, index) => (
          <div
            key={index}
            className="aspect-square relative cursor-pointer"
            onMouseEnter={handleHover}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-black text-lg md:text-xl font-pokemon-pixel bg-textbox px-1 uppercase">
                {image.alt}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full px-4 pt-4">
        <DividerLine text="Features" />
      </div>

      {/* Flexbox with map and smaller images */}
      <div className="w-full flex flex-col md:flex-row gap-4 px-4">
        {/* Map section - 2/5 width on desktop */}
        <div className="relative w-full md:w-2/5 aspect-square flex items-start justify-center p-4">
          <div className="relative aspect-square w-full rounded-full overflow-hidden">
            <div className="w-full h-full rounded-full overflow-hidden">
              <img
                src="/map.png"
                alt="Map"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-full cursor-pointer z-100"
                onMouseEnter={handleHover}
              >
                <p className="text-black text-lg md:text-2xl font-pokemon-pixel bg-textbox px-1 uppercase z-100">
                  Autonomous Navigation
                </p>
              </div>
            </div>
            <svg
              className="absolute top-0 left-0 w-full h-full opacity-100 pointer-events-none z-10"
              viewBox="-648 -122 2152 2152"
            >
              <path
                id="motionPath"
                d="M17.0003 1C10.0003 24.1667 -2.79969 76.4 2.00031 100C6.80031 123.6 21.3334 132.167 28 133.5C41.3333 133 71.7 133.2 86.5 138C101.3 142.8 114 152 118.5 156C116.667 171 106.7 204.1 81.5 216.5C76.5 235.167 74.8 278.7 108 303.5C149.5 334.5 187.5 364 246 358C292.8 353.2 347.167 336.333 368.5 328.5C388.333 328.167 436.2 331.7 469 348.5C501.8 365.3 562.333 395.167 588.5 408C612.333 421.167 659.6 449.4 658 457C656 466.5 649 490.5 592.5 490C536 489.5 601.5 543 622 561.5C642.5 580 637 587 601 602C572.2 614 632.667 678 666.5 708.5C687.667 726.833 731.8 769.7 739 794.5C746.2 819.3 650 868.167 601 889.5C589.667 892.333 567 900.6 567 911C567 921.4 578.333 936.667 584 943C576.833 959.5 561.6 999.1 558 1025.5C553.5 1058.5 588 1059 550.5 1118.5C520.5 1166.1 393.333 1300.33 333.5 1361.5C324.5 1363.33 301.5 1397.6 281.5 1520C274.5 1602 267.8 1784 297 1856"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeDasharray="12,8"
                opacity={0.7}
                strokeLinecap="round"
                filter="drop-shadow(0 0 2px rgba(255,255,255,0.4))"
              />
              {/* Start marker */}
              <circle id="startMarker" cx="17" cy="1" r="16" fill="red" />
              {/* Moving dot */}
              <circle id="dot" cx="17" cy="1" r="32" fill="white" />
              {/* End marker */}
              <circle id="endMarker" cx="297" cy="1856" r="16" fill="green" />
            </svg>
          </div>
        </div>
        {/* Text section - 3/5 width on desktop */}
        <div className="w-full md:w-3/5 flex flex-col items-end p-4 pt-0">
          <h2 className="text-2xl md:text-3xl font-pokemon-pixel mb-4 text-right">
            Advanced Navigation System
          </h2>
          <p className="mb-3 text-right">
            Our autonomous navigation system leverages state-of-the-art
            artificial intelligence to expertly traverse intricate terrains and
            diverse environments without requiring human oversight. Designed for
            robustness and adaptability, it excels in scenarios ranging from
            dense urban landscapes to rugged wilderness, ensuring seamless
            operation regardless of external conditions.
            <br />
            <br />
            The AI at its core is engineered to handle dynamic challenges,
            making real-time decisions that optimize performance and safety. The
            system integrates a sophisticated array of sensors—including LiDAR,
            radar, ultrasonic, and high-resolution cameras—to gather detailed
            environmental data. These sensors work in unison to detect
            obstacles, assess terrain features, and monitor changing conditions
            such as weather or light levels. By processing this real-time data,
            the system constructs a comprehensive, continuously updated 3D map
            of its surroundings.
            <br />
            <br />
            In GPS-denied environments—such as tunnels, dense forests, or areas
            with active signal jamming—SCOUT seamlessly transitions to its
            inertial navigation system (INS). The INS relies on advanced
            gyroscopes and accelerometers to track movement and orientation with
            exceptional accuracy, maintaining uninterrupted operation.
          </p>
        </div>
      </div>

      {/* Second flexbox row - reversed on desktop */}
      <div className="w-full flex flex-col md:flex-row gap-4 px-4 mt-8">
        {/* Text section - 3/5 width on desktop */}
        <div className="w-full md:w-3/5 flex flex-col justify-center p-4">
          <h2 className="text-2xl md:text-3xl font-pokemon-pixel mb-4">
            Component Specifications
          </h2>
          <p className="mb-3">
            Each component of the SCOUT vehicle is meticulously engineered to
            deliver exceptional durability and peak performance under the
            harshest and most extreme conditions imaginable. Whether deployed in
            scorching deserts, frigid arctic zones, or volatile combat zones,
            every element is crafted to withstand relentless wear, environmental
            stressors, and operational demands, ensuring the vehicle remains
            fully functional when it matters most. of its surroundings.
            <br />
            <br />
            At the heart of SCOUT's sensory suite are its cutting-edge 8K sensor
            optics, which provide unparalleled visual clarity and precision.
            These high-resolution systems capture intricate details of the
            surrounding environment, from minute terrain variations to distant
            obstacles, even in low-visibility scenarios like fog, dust storms,
            or pitch-black nights. The optics feed real-time,
            ultra-high-definition data to the AI navigation system, enabling
            split-second decision-making with unmatched accuracy. This level of
            visual fidelity ensures SCOUT can detect and respond to threats or
            challenges that lesser systems might miss, making it a game-changer
            for reconnaissance, exploration, or tactical operations.
          </p>
        </div>

        {/* Component images grid - 2/5 width on desktop */}
        <div className="w-full md:w-2/5 flex flex-col">
          <div className="grid grid-cols-2 grid-rows-2 gap-0.5 w-full">
            {[
              { src: "/sensor.png", alt: "8k Sensor Optics" },
              { src: "/window.png", alt: "3M Certified Bulletproof Windows" },
              { src: "/light.png", alt: "30K Lumen Light System" },
              { src: "/tire.png", alt: "400,000 Mile Rated Tire Tread" },
            ].map((image, index) => (
              <div
                key={index}
                className="aspect-square relative border-2 border-border cursor-pointer w-full"
                onMouseEnter={handleHover}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0">
                  <p className="text-black text-lg md:text-xl font-pokemon-pixel bg-textbox px-1 uppercase">
                    {image.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Military-grade Footer */}
      <div className="w-full mt-16 relative">
        {/* <div className="w-full py-2 px-4 ">
          <DividerLine text="" />
        </div> */}

        <div className="w-full bg-black text-white py-8 px-4 relative overflow-hidden">
          {/* Tactical grid background */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-12 h-full w-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="border-r border-white/20 h-full"></div>
              ))}
            </div>
            <div className="grid grid-rows-6 h-full w-full">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="border-b border-white/20 w-full"></div>
              ))}
            </div>
          </div>

          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {/* Logo and motto */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="font-digitaltech text-3xl mb-2">SCOUT</h3>
              <p className="font-pokemon-pixel text-sm text-white mb-4 tracking-widest">
                AUTONOMOUS CONTROL SYSTEMS
              </p>
              <p className="text-sm text-gray-500 text-center md:text-left">
                Engineered for mission-critical operations in the most demanding
                environments.
              </p>
            </div>

            {/* Quick links */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="font-pokemon-pixel text-lg mb-4 uppercase tracking-wide">
                Tactical Systems
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Navigation",
                  "Defense",
                  "Reconnaissance",
                  "Communication",
                  "Security",
                  "Logistics",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="cursor-pointer bg-textbox px-2 py-1 flex items-center justify-center group relative transition-all duration-200 hover:bg-black"
                    onMouseEnter={handleHover}
                  >
                    <span className="text-black font-pokemon-pixel text-center group-hover:text-white transition-colors duration-200">
                      {item}
                    </span>
                    <div className="absolute inset-0 border border-transparent group-hover:border-white/30 transition-all duration-200" />
                  </div>
                ))}
              </div>
            </div>

            {/* Contact info */}
            <div className="flex flex-col items-center md:items-end">
              <h4 className="font-pokemon-pixel text-lg mb-4 uppercase tracking-wide">
                Reach Us
              </h4>
              <div className="flex space-x-4 mb-4">
                {["Twitter", "LinkedIn", "GitHub", "Email"].map(
                  (platform, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 border border-white/30 flex items-center justify-center cursor-pointer hover:border-white/60 transition-colors duration-200"
                      onMouseEnter={handleHover}
                    >
                      <span className="text-xs">{platform[0]}</span>
                    </div>
                  )
                )}
              </div>
              <p className="text-sm text-gray-500 text-center md:text-right">
                Inquiries regarding technical specifications should be directed
                through official channels.
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/20 mt-8 pt-4 flex flex-col md:flex-row justify-between items-center relative z-10">
            <p className="text-xs text-gray-500 mb-2 md:mb-0">
              © {new Date().getFullYear()} SCOUT SYSTEMS | All rights reserved
            </p>
            <div className="flex items-center">
              <div
                id="coordinates"
                className="font-mono text-xs tracking-wider text-gray-500"
              >
                LAT: 38°52′15″N LON: 77°3′21″W
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* </div> */}
    </div>
  );
}
