"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { getCookie } from "cookies-next";

const Sidebar = dynamic(() => import("@/components/Sidebar"), { ssr: false });
const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });

const RootLayout = ({ children }: any) => {
  const pathName = usePathname();
  if (["/signin", "/signup"].indexOf(pathName) !== -1) {
    return <Provider store={store}>{children}</Provider>;
  }

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
        <Sidebar />
        <div
          className={`h-full col-span-10 flex flex-col justify-start items-start`}
        >
          <Navbar />
          {children}
        </div>
      </div>
    </Provider>
  );
};

export default RootLayout;
