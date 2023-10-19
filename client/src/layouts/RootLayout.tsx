"use client";

import React from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
const Sidebar = dynamic(() => import("@/components/Sidebar"), { ssr: false });
const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });

const RootLayout = ({ children }: any) => {
  const pathName = usePathname();
  if (pathName === "/login") {
    return <>{children}</>;
  }
  return (
    <div className={`min-h-[100vh] w-full grid grid-cols-12 bg-dark-secondary`}>
      <Sidebar />
      <div className={`h-full col-span-10 flex flex-col justify-start items-start`}>
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default RootLayout;
