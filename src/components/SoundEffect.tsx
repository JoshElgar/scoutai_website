"use client";

import { useEffect, useRef } from "react";
import * as Tone from "tone";

export default function SoundEffect() {
  const playerRef = useRef<Tone.Player | null>(null);
  const lastScrollPositionRef = useRef(0);

  useEffect(() => {
    // Initialize player
    playerRef.current = new Tone.Player({
      url: "/click.mp3",
      autostart: false,
      volume: -25,
    }).toDestination();

    const handleScroll = async () => {
      const currentScrollPosition = window.scrollY;
      const scrollDiff = Math.abs(
        currentScrollPosition - lastScrollPositionRef.current
      );

      if (scrollDiff >= 50) {
        // Start Tone.js if needed
        await Tone.start();

        // Play sound if loaded
        if (playerRef.current?.loaded) {
          playerRef.current.start();
        }

        lastScrollPositionRef.current = currentScrollPosition;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      playerRef.current?.dispose();
    };
  }, []);

  return null;
}
