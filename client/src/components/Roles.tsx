"use client";

import Image from "next/image";
import React, { useState } from "react";

const Roles = ({
  user,
  members,
  setMembers,
  membersObj,
  setMembersObj,
  users,
}: any) => {
  const memberObj = membersObj?.find((item: any) => item?.member === user?._id);

  console.log("memberObj: ", memberObj);

  const [role, setRole] = useState(memberObj?.role);

  const onRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const {value} = e.target;
    console.log("role: ", value)
    setRole(value);
    if (membersObj.some((item: any) => item?.member === user?._id)) {
      setMembersObj((prev: any) =>
        prev.map((item: any) =>
          item.member === user?._id
            ? { member: item?.member, role: value }
            : item
        )
      );
    }
  };

  const onToggleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    const user = users.find((item: any) => item?._id === value);
    if (members?.find((item: any) => item === user?._id)) {
      setMembers((prev: any) => prev.filter((item: any) => item !== user?._id));
      setMembersObj((prev: any) =>
        prev.filter((item: any) => item.member !== user?._id)
      );
    } else {
      setMembers((prev: any) => [...prev, user?._id]);
      setMembersObj((prev: any) => [...prev, { member: user?._id, role }]);
    }
  };

  return (
    <div
      className={`w-full flex justify-between items-center rounded-md bg-transparent`}
    >
      <div className={`flex justify-start items-center gap-4`}>
        <input
          type="checkbox"
          name="checkUser"
          id="checkUser"
          value={user?._id}
          checked={members?.some((item: any) => item === user?._id)}
          onChange={onToggleSelect}
          className={`h-4 w-4`}
        />

        <div
          className={`relative h-[30px] w-[30px] border border-dark-primary 
                    rounded-full overflow-hidden cursor-pointer`}
        >
          <Image src={user?.dp} alt="dp" fill />
        </div>
        <p>{user?.name}</p>
      </div>

      <select
        name="role"
        id="role"
        value={role}
        onChange={onRoleChange}
        className={`p-2 rounded-md border border-dark-primary outline-none bg-dark-secondary`}
      >
        <option value="read-only">read-only</option>
        <option value="write-only">write-only</option>
        <option value="full-access">full-access</option>
      </select>
    </div>
  );
};

export default Roles;
