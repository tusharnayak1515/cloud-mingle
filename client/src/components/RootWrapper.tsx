"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { shallowEqual, useSelector } from "react-redux";
const Sidebar = dynamic(() => import("@/components/Sidebar"), { ssr: false });
const SidebarModal = dynamic(() => import("@/components/modals/SidebarModal"), {
  ssr: false,
});
const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });

const RootWrapper = ({ children }: any) => {
  const { theme } = useSelector(
    (state: any) => state.userReducer,
    shallowEqual
  );

  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div
      className={`min-h-[100vh] w-full grid grid-cols-12 ${
        theme === "dark" ? "bg-dark-secondary" : "bg-slate-200"
      }`}
    >
      <SidebarModal showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <Sidebar />
      <div
        className={`h-full col-span-12 md_link:col-span-9 xl:col-span-10 flex flex-col justify-start items-start`}
      >
        <Navbar setShowSidebar={setShowSidebar} />
        {children}
      </div>
    </div>
  );
};

export default RootWrapper;
