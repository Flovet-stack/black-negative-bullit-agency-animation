"use client";

import { useState } from "react";
import { Loader, SquaresGrid } from "./_components";

export default function Home() {
  const [clear, setClear] = useState<boolean>(false);

  return (
    <main className="">
      <video
        src="/background-video.mp4"
        playsInline
        autoPlay
        muted
        loop
      ></video>

      <div className="page-content">
        <div className="sub">
          <h1>
            designer Dilshan Arukatti <br /> &amp; developer sylvian tran <br />
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
