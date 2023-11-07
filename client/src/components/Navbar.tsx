"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { collectionLogout } from "@/redux/reducers/collectionReducer";
import { invitelogout } from "@/redux/reducers/inviteReducer";
import { starredlogout } from "@/redux/reducers/starredReducer";
import { userLogout } from "@/redux/reducers/userReducer";
import { deleteCookie } from "cookies-next";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { BsFillSunFill } from "react-icons/bs";
import { RiShutDownLine } from "react-icons/ri";
import { HiMenuAlt1 } from "react-icons/hi";

const Navbar = ({ setShowSidebar }: any) => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { profile } = useSelector(
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

  return (
    <div
      className={`w-full p-4 text-dark-primary flex justify-between md_link:justify-end items-center gap-3 border-b border-dark-primary`}
    >
      <HiMenuAlt1
        className={`block md_link:hidden text-3xl text-dark-primary cursor-pointer`}
        onClick={() => setShowSidebar(true)}
      />

      <div className={`flex justify-start items-center gap-3`}>
        <BsFillSunFill className={`text-2xl cursor-pointer`} />
        <RiShutDownLine
          className={`text-2xl cursor-pointer`}
          onClick={onLogout}
        />
        <div
          className={`relative h-[30px] w-[30px] border border-dark-primary 
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
