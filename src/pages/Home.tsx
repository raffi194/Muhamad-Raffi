"use client";

import React from "react";
import ScrambledText from "../component/text/textbio/ScrambledText";
import Lanyard from "../component/lanyard/Lanyard";
import CVButton from "../component/button/HomeButton/Button";
import StaggeredMenu from "../component/navbar/StaggeredMenu";

const menuItems = [
  { label: "Home", ariaLabel: "Go to home page", link: "/" },
  { label: "About", ariaLabel: "Learn about us", link: "/about" },
  { label: "Services", ariaLabel: "View our services", link: "/services" },
  { label: "Contact", ariaLabel: "Get in touch", link: "/contact" },
];

const socialItems = [
  { label: "Twitter", link: "https://twitter.com" },
  { label: "GitHub", link: "https://github.com" },
  { label: "LinkedIn", link: "https://linkedin.com" },
];

const Home = () => {
  return (
    <div className="relative h-screen bg-neutral-900 overflow-hidden flex">

      <StaggeredMenu
        isFixed
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials
        displayItemNumbering
        menuButtonColor="#fff"
        openMenuButtonColor="#000"
        changeMenuColorOnOpen
        colors={["#B19EEF", "#5227FF"]}
        logoUrl="/logo.png"
        accentColor="#ff6b6b"
      />

      <div className="absolute inset-0 z-20 pointer-events-none">

        <div className="w-full h-full pointer-events-auto">
             <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
        </div>
      </div>

      <div className="relative w-full flex flex-col justify-center text-white px-10 gap-8 pointer-events-none">

        <div className="relative flex justify-between items-center border-b border-neutral-700 pb-6 pointer-events-auto">
          <div>
            <h1 className="text-6xl font-bold tracking-tighter mb-2">
              Muhamad Raffi
            </h1>
            <p className="text-xl font-light text-neutral-400">As a Student</p>
          </div>
          
        </div>

        <div className="relative z-30 flex gap-12 mt-4 pointer-events-auto">
          <StatCard value="3.5+" label="Aggregate GPA" />
          <StatCard value="1+" label="Project" />
          <StatCard value="01+" label="Years Experience" />
          <CVButton />
        </div>

        <div className="relative z-20 w-fit mt-4 pointer-events-auto">
          <ScrambledText
            className="scrambled-text-demo text-xl leading-relaxed text-neutral-300"
            radius={100}
            duration={1.2}
            speed={0.5}
            scrambleChars=".:"
          >
            I am a second-year Information Systems student at Brawijaya
            University, highly enthusiastic about technology and an avid reader.
            I have a self- motivated and optimistic attitude, and I am capable of
            thriving in challenging and dynamic environments. Currently, I am
            looking to improve my skills and contribute to a professional
            organization. I am very eager to learn new things that interest me
            and can help me grow.
          </ScrambledText>
        </div>
      </div>

    </div>
  );
};

export default Home;


function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-3xl font-bold">{value}</span>
      <span className="text-sm text-neutral-400 uppercase tracking-wider font-medium">
        {label}
      </span>
    </div>
  );
} 