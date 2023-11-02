"use client";

import { collectionLogout } from "@/redux/reducers/collectionReducer";
import { invitelogout } from "@/redux/reducers/inviteReducer";
import { starredlogout } from "@/redux/reducers/starredReducer";
import { userLogout } from "@/redux/reducers/userReducer";
import { deleteCookie } from "cookies-next";
import Image from "next/image";
import React from "react";
import { BsFillSunFill } from "react-icons/bs";
import { RiShutDownLine } from "react-icons/ri";
import { useDispatch } from "react-redux";

const Navbar = () => {

  const dispatch:any = useDispatch();

  const onLogout = ()=> {
    localStorage.removeItem("user_data");
    deleteCookie("authorization");
    dispatch(userLogout());
    dispatch(collectionLogout());
    dispatch(invitelogout());
    dispatch(starredlogout());
  }

  return (
    <div
      className={`w-full p-4 text-dark-primary flex justify-end items-center gap-3 border-b border-dark-primary`}
    >
      <BsFillSunFill className={`text-2xl cursor-pointer`} />
      <RiShutDownLine className={`text-2xl cursor-pointer`} onClick={onLogout} />
      <div
        className={`relative h-[30px] w-[30px] border border-dark-primary 
      rounded-full overflow-hidden cursor-pointer`}
      >
        <Image
          src={
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
          }
          alt="dp"
          fill
        />
      </div>
    </div>
  );
};

export default Navbar;
