"use client";

import { useEffect, useState } from "react";
import { Loader, SquaresGrid } from "./_components";

export default function Home() {
  const [clear, setClear] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

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

  return (
    <main className="">
      {isLoaded && (
        <video
          src="/background-video.mp4"
          playsInline
          autoPlay
          muted
          loop
        ></video>
      )}

      {isLoaded && (
        <div className="page-content">
          <div className="sub">
            <h1>
              designer Dilshan Arukatti <br /> &amp; developer sylvian tran{" "}
              <br />
              collaborate with us
            </h1>
            <p>
              Blacknegative collaborates with its talented <br />
              staff to find the best creative solutions,
              <br /> in order to create outstanding interactive experiences.
            </p>

            <button>Luanch their work &mdash; thebullitagency.com</button>
          </div>
        </div>
      )}

      {!clear && (
        <SquaresGrid
          cleared={() => {
            setTimeout(() => {
              setClear(true);
            }, 2000);
          }}
        />
      )}
      <Loader />
    </main>
  );
}
