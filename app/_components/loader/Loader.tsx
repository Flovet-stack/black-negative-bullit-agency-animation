"use client";

import { Variants, motion } from "framer-motion";
import React, { useState, useEffect } from "react";

export const Loader = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    // Set initial dimensions
    handleResize();

    // Add event listener to update dimensions on window resize
    window.addEventListener("resize", handleResize);

    return () => {
      // Clean up event listener on component unmount
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    function onSquareLoaded(callback: (isLoaded: boolean) => void) {
      // Create a MutationObserver to watch for changes in the DOM
      const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
          if (mutation.type === "childList") {
            // Convert NodeList to Array before iterating
            const addedNodes = Array.from(mutation.addedNodes);
            for (let node of addedNodes) {
              // Ensure the node is an instance of Element before accessing classList
              if (
                node instanceof Element &&
                node.classList.contains("square")
              ) {
                // Disconnect the observer since we only need to detect the first instance
                observer.disconnect();
                // Call the callback function
                callback(true);
                return;
              }
            }
          }
        }
      });

      // Start observing the document body for changes in child elements
      observer.observe(document.body, { childList: true, subtree: true });
    }

    onSquareLoaded((isLoaded) => {
      if (isLoaded) {
        setIsLoaded(true);
      }
    });
  }, []);

  const loaderVariants: Variants = {
    loading: {
      width: 50,
      height: 50,
      borderWidth: "1000px",
      borderStyle: "solid",
      borderColor: "#b8ddef",
      backgroundColor: "#0f1012",
      display: "block",
      transition: {
        duration: 0,
      },
    },
    animate: {
      width: dimensions.width,
      height: dimensions.height,
      borderWidth: ["1000px", "0px"],
      borderStyle: "solid",
      borderColor: "#b8ddef",
      backgroundColor: "transparent",
      display: ["block", "none"],
      transition: {
        duration: 1.25,
        ease: "easeInOut",
        times: [0, 1],
      },
    },
  };

  return (
    <motion.div
      className="loader-box"
      animate={isLoaded ? "animate" : "loading"}
      variants={loaderVariants}
    />
  );
};
