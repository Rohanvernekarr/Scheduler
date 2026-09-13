"use client";

import { useEffect } from "react";

interface RunningCatProps {
  /**
   * Starting position of the cat in pixels.
   * Default: { x: 50, y: 50 }
   */
  startPos?: { x: number; y: number };
  /**
   * Path to the skin image.
   * Default: Classic Oneko
   */
  imgUrl?: string;
}

// Global state to track if cat is initialized
let catInitialized = false;


export default function RunningCat({
  startPos = { x: 50, y: 50 },
  imgUrl = "https://raw.githubusercontent.com/adryd325/oneko.js/master/oneko.gif",
}: RunningCatProps) {
  useEffect(() => {
    // If already initialized, don't create a new one
    if (catInitialized) return;
    
    catInitialized = true;

    // --- Configuration ---
    const speed = 10;
    const nekoEl = document.createElement("div");
    
    let nekoPosX = startPos.x;
    let nekoPosY = startPos.y;
    
    // Default mouse to cat pos so it doesn't run immediately
    let mousePosX = startPos.x; 
    let mousePosY = startPos.y;
    
    let frameCount = 0;
    let idleTime = 0;
    
    // Sprite definitions (Name: [GridX, GridY])
    // The sprite sheet is a 32x32 grid.
    const spriteSets: Record<string, number[][]> = {
      idle: [[-3, -3]],
      alert: [[-7, -3]],
      scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
      scratchWallN: [[0, 0], [0, -1]],
      scratchWallS: [[-7, -1], [-6, -2]],
      scratchWallE: [[-2, -2], [-2, -3]],
      scratchWallW: [[-4, 0], [-4, -1]],
      tired: [[-3, -2]],
      sleeping: [[-2, 0], [-2, -1]],
      N: [[-1, -2], [-1, -3]],
      NE: [[0, -2], [0, -3]],
      E: [[-3, 0], [-3, -1]],
      SE: [[-5, -1], [-5, -2]],
      S: [[-6, -3], [-7, -2]],
      SW: [[-5, -3], [-6, -1]],
      W: [[-4, -2], [-4, -3]],
      NW: [[-1, 0], [-1, -1]],
    };

    // --- DOM Setup ---
    nekoEl.id = "oneko";
    nekoEl.style.width = "32px";
    nekoEl.style.height = "32px";
    nekoEl.style.position = "fixed";
    nekoEl.style.pointerEvents = "none";
    nekoEl.style.backgroundImage = `url('${imgUrl}')`;
    nekoEl.style.imageRendering = "pixelated";
    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
    nekoEl.style.zIndex = "9999"; // Ensure it sits on top
    
    document.body.appendChild(nekoEl);

    function onMouseMove(event: MouseEvent) {
      mousePosX = event.clientX;
      mousePosY = event.clientY;
    }

    document.addEventListener("mousemove", onMouseMove);

    function setSprite(name: string, frame: number) {
      const sprites = spriteSets[name];
      const sprite = sprites[frame % sprites.length];
      nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
    }

    function frame() {
      frameCount++;
      const diffX = nekoPosX - mousePosX;
      const diffY = nekoPosY - mousePosY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

      // --- Idle Logic ---
      if (distance < speed || distance < 48) {
        idleTime++;

        if (idleTime > 10) {
            // Determine idle animation based on time waiting
            let idleAnim = "idle";
            
            // After ~2 seconds, scratch self
            if (idleTime > 20 && idleTime < 50) {
                idleAnim = "scratchSelf";
            } 
            // After ~5 seconds, get tired/sleep
            else if (idleTime > 50) {
                idleAnim = "sleeping";
            }

            setSprite(idleAnim, frameCount);
            return; 
        }
        
        // Just stopped moving, look alert
        setSprite("idle", 0);
        return;
      }

      // --- Movement Logic ---
      idleTime = 0;
      const velocity = distance > speed ? speed : distance;
      const direction = Math.atan2(diffY, diffX);
      const velX = Math.cos(direction) * velocity;
      const velY = Math.sin(direction) * velocity;

      nekoPosX -= velX;
      nekoPosY -= velY;

      nekoEl.style.left = `${nekoPosX - 16}px`;
      nekoEl.style.top = `${nekoPosY - 16}px`;

      // Determine cardinal direction for walking sprite
      const degrees = (direction * 180) / Math.PI;
      let directionKey = "S";

      if (degrees > -22.5 && degrees <= 22.5) directionKey = "W";
      else if (degrees > 22.5 && degrees <= 67.5) directionKey = "NW";
      else if (degrees > 67.5 && degrees <= 112.5) directionKey = "N";
      else if (degrees > 112.5 && degrees <= 157.5) directionKey = "NE";
      else if (degrees > 157.5 || degrees <= -157.5) directionKey = "E";
      else if (degrees > -157.5 && degrees <= -112.5) directionKey = "SE";
      else if (degrees > -112.5 && degrees <= -67.5) directionKey = "S";
      else if (degrees > -67.5 && degrees <= -22.5) directionKey = "SW";

      setSprite(directionKey, frameCount);
    }

    setInterval(frame, 100);

    // Don't cleanup on unmount - let the cat persist
    return () => {
      // No cleanup here to keep cat running across navigation
    };
  }, [startPos, imgUrl]);

  return null;
}   