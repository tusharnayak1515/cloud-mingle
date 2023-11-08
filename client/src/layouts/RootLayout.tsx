"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { getCookie } from "cookies-next";
const RootWrapper = dynamic(() => import("@/components/RootWrapper"), {
  ssr: false,
});

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
      <RootWrapper children={children} />
    </Provider>
  );
};

export default RootLayout;
