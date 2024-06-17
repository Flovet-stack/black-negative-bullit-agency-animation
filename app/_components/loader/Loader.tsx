"use client";

import { Variants, motion } from "framer-motion";
import React, { useState } from "react";

export const Loader = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const width = window.innerWidth;
  const height = window.innerHeight;

  function onSquareLoaded(callback: (isLoaded: boolean) => void) {
    // Create a MutationObserver to watch for changes in the DOM
    const observer = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
          // Convert NodeList to Array before iterating
          const addedNodes = Array.from(mutation.addedNodes);
          for (let node of addedNodes) {
            // Ensure the node is an instance of Element before accessing classList
            if (node instanceof Element && node.classList.contains("square")) {
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

  const loaderVariants: Variants = {
    loading: () => ({
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
    }),
    animate: () => ({
      width,
      height,
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
    }),
  };

  return (
    <motion.div
      className="loader-box"
      animate={isLoaded ? "animate" : "loading"}
      //   animate={"loading"}
      variants={loaderVariants}
    />
  );
};
