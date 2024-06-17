"use client";

import { Variants, motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";

interface SquareProps {
  isCenterGrid: boolean;
  squareSize: number;
  clicked?: () => void;
  clear: boolean;
  x?: number;
  y?: number;
}

export const Square: React.FC<SquareProps> = ({
  isCenterGrid,
  squareSize,
  clicked,
  clear,
  x,
  y,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getRandomNumberBetween0And2 = () => {
    return Math.random() * 2 + 0;
  };

  const fadeOutAnimationVariants: Variants = {
    initial: () => ({
      opacity: 1,
      transition: {
        delay: 1,
        duration: 0,
      },
    }),
    animate: () => ({
      opacity: 0,
      transition: {
        duration: 0,
      },
    }),
    fadeout: () => ({
      opacity: 0,
      transition: {
        duration: 0.25,
        delay: getRandomNumberBetween0And2(), // this sets the animation time it takes to clear the grid from the screen to 2 seconds
      },
    }),
  };

  // Image mapping for specific squares
  const imageMap: { [key: string]: string } = {
    "2-3": "/letters/wetry.jpg",
    "3-4": "/letters/m.jpg",
    "3-5": "/letters/a.jpg",
    "3-6": "/letters/k.jpg",
    "3-7": "/letters/e.jpg",
    "4-4": "/letters/t.jpg",
    "4-5": "/letters/h.jpg",
    "4-6": "/letters/e.jpg",
    "4-7": "/letters/line.jpg",
    "4-8": "/letters/w-bold.jpg",
    "4-9": "/letters/e-bold.jpg",
    "4-10": "/letters/b-bold.jpg",
    "5-4": "/letters/a.jpg",
    "5-5": "/letters/line.jpg",
    "5-6": "/letters/b-bold.jpg",
    "5-7": "/letters/e-bold.jpg",
    "5-8": "/letters/t-bold.jpg",
    "5-9": "/letters/t-bold.jpg",
    "5-10": "/letters/e-bold.jpg",
    "5-11": "/letters/r-bold.jpg",
    "6-4": "/letters/p.jpg",
    "6-5": "/letters/l.jpg",
    "6-6": "/letters/a.jpg",
    "6-7": "/letters/c.jpg",
    "6-8": "/letters/e.jpg",
  };

  const imageUrl = imageMap[`${x}-${y}`]; // Get image URL if exists

  return (
    <motion.div
      // className={`square ${isCenterGrid ? "red" : ""} ${clear ? "clear" : ""}`}
      className={`square  ${clear ? "clear" : ""}`}
      onClick={clicked}
      style={{
        width: squareSize,
        height: squareSize,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={clear ? "fadeout" : isHovered ? "animate" : "initial"}
      variants={fadeOutAnimationVariants}
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="square"
          width={100}
          height={100}
          style={{ width: "100%", height: "100%" }}
        />
      )}
      {/* {`${x} - ${y}`} */}
    </motion.div>
  );
};
