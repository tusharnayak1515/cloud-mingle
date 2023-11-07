"use client";

import Image from "next/image";
import React from "react";

const UserDetails = ({ profile }: any) => {
  return (
    <>
      <div
        className={`relative h-[200px] w-[200px] border-2 border-dark-primary rounded-full`}
      >
        <Image src={profile?.dp} alt="User dp" fill className={`rounded-full`} />
      </div>

      <h1 className={`text-xl xs:text-2xl font-bold`}>{profile?.name}</h1>
    </>
  );
};

export default UserDetails;
