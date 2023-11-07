"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { getCookie } from "cookies-next";
import SidebarModal from "@/components/modals/SidebarModal";

const Sidebar = dynamic(() => import("@/components/Sidebar"), { ssr: false });
const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });

const RootLayout = ({ children }: any) => {
  const pathName = usePathname();
  if (["/signin", "/signup"].indexOf(pathName) !== -1) {
    return <Provider store={store}>{children}</Provider>;
  }

  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const user = getCookie("authorization");
    if (!user) {
      localStorage.removeItem("user_data");
    }
  }, []);

  return (
    <Provider store={store}>
      <div
        className={`min-h-[100vh] w-full grid grid-cols-12 bg-dark-secondary`}
      >
        {showSidebar && <SidebarModal setShowSidebar={setShowSidebar} />}
        <Sidebar />
        <div
          className={`h-full col-span-12 md_link:col-span-9 xl:col-span-10 flex flex-col justify-start items-start`}
        >
          <Navbar setShowSidebar={setShowSidebar} />
          {children}
        </div>
      </div>
    </Provider>
  );
};

export default RootLayout;
