"use client";

import React from "react";
import ScrambledText from "../component/text/textbio/ScrambledText";
import Lanyard from "../component/lanyard/Lanyard";

const Home = () => {
  return (
    <div className="h-screen bg-neutral-900 flex">
      {/* LEFT SECTION */}
      <div className="w-3/4 flex flex-col justify-center text-white p-10">
        <ScrambledText
          className="scrambled-text-demo"
          radius={100}
          duration={1.2}
          speed={0.5}
          scrambleChars=".:"  
        >
          I am a second-year Information Systems student at Brawijaya
          University, highly enthusiastic about technology and an avid reader.
          I have a self-motivated and optimistic attitude, and I am capable of
          thriving in challenging and dynamic environments. Currently, I am
          looking to improve my skills and contribute to a professional
          organization. I am very eager to learn new things that interest me
          and can help me grow.
        </ScrambledText>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-1/4 p-5 flex justify-center items-center overflow-visible">
        <div className="flex justify-center items-center overflow-visible">
          <Lanyard position={[0, 0, 12]} gravity={[0, -40, 0]} />
        </div>
      </div>
    </div>
  );
};

export default Home;
