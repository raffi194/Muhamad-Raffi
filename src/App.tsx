"use client";

import React, { useState } from "react";
import TextPressure from "./component/text/textstart/TextPressure";
import StartButton from "./component/button/StartButton/StartButton";
import HomePage from "./pages/Home";
import Layout from "./layout/Layout";

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <Layout>
      {!started && (
        <div className="h-screen flex flex-col items-center justify-center bg-black">
          <TextPressure />
          <div className="mt-10">
            <StartButton onClick={() => setStarted(true)} />
          </div>
        </div>
      )}

      {started && <HomePage />}
    </Layout>
  );
}
