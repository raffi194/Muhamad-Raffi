"use client";

import React, { useState } from "react";
import TextPressure from "./component/text/textstart/TextPressure";
import StartButton from "./component/button/StartButton/StartButton";
import MainContent from "./pages/Home";

export default function App() {
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <div className="h-screen flex flex-col items-center justify-center py-20 px-10 bg-black">
        <TextPressure />

        <div className="mt-10">
          <StartButton onClick={() => setStarted(true)} />
        </div>
      </div>
    );
  }

  return <MainContent />;
}
