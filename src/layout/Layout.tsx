import React from "react";
import CardNav from "../component/navbar/CardNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <CardNav
        logo="/logo.png"
        logoAlt="Portfolio Logo"
        baseColor="#ffffff"
        menuColor="#000"
        buttonBgColor="#111"
        buttonTextColor="#fff"
      />

      <div className=""> 
        {children}
      </div>
    </div>
  );
}
