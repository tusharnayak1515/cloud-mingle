"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { collectionLogout } from "@/redux/reducers/collectionReducer";
import { invitelogout } from "@/redux/reducers/inviteReducer";
import { starredlogout } from "@/redux/reducers/starredReducer";
import { setTheme, userLogout } from "@/redux/reducers/userReducer";
import { deleteCookie, setCookie } from "cookies-next";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { RiShutDownLine } from "react-icons/ri";
import { HiMenuAlt1 } from "react-icons/hi";

const Navbar = ({ setShowSidebar }: any) => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { profile, theme } = useSelector(
    (state: any) => state.userReducer,
    shallowEqual
  );

  const onLogout = () => {
    localStorage.removeItem("user_data");
    deleteCookie("authorization");
    dispatch(userLogout());
    dispatch(collectionLogout());
    dispatch(invitelogout());
    dispatch(starredlogout());
  };

  const onToggleTheme = () => {
    if (theme === "dark") {
      setCookie("theme", "light");
      dispatch(setTheme({ theme: "light" }));
    } else {
      setCookie("theme", "dark");
      dispatch(setTheme({ theme: "dark" }));
    }
  };

  const RenderIcon = () => {
    return (
      <div
        className={`w-full p-1 flex items-center ${
          theme === "dark" ? "bg-slate-800" : "bg-slate-300"
        } rounded-full`}
      >
        {theme === "dark" ? (
          <BsFillMoonFill className={`w-[20px] translate-x-[60px] text-2xl`} />
        ) : (
          <BsFillSunFill className={`w-[20px] translate-x-0 text-2xl`} />
        )}
      </div>
    );
  };

  return (
    <div
      className={`w-full p-4 ${
        theme === "dark"
          ? "text-dark-primary border-dark-primary"
          : "text-dark-secondary border-dark-secondary"
      } 
      flex justify-between md_link:justify-end items-center gap-3 border-b`}
    >
      <HiMenuAlt1
        className={`block md_link:hidden text-3xl ${
          theme === "dark" ? "text-dark-primary" : "text-dark-secondary"
        } cursor-pointer`}
        onClick={() => setShowSidebar(true)}
      />

      <div className={`flex justify-start items-center gap-3`}>
        <div
          className={`w-[100px] p-1 ${
            theme === "dark"
              ? "shadow-dark-menuShadow bg-dark-primary"
              : "shadow-light-menuShadow bg-slate-400"
          } rounded-full overflow-hidden `}
        >
          <div
            className={`w-full cursor-pointer transition-all duration-300`}
            onClick={onToggleTheme}
          >
            <RenderIcon />
          </div>
        </div>

        <RiShutDownLine
          className={`text-2xl cursor-pointer`}
          onClick={onLogout}
        />
        <div
          className={`relative h-[30px] w-[30px] border ${
            theme === "dark" ? "border-dark-primary" : "border-dark-secondary"
          } 
          rounded-full overflow-hidden cursor-pointer`}
          onClick={() => router.push("/profile")}
        >
          <Image src={profile?.dp} alt="dp" fill />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
