"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ReactDom from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import { getAllUsers } from "@/apiCalls/user";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Roles from "../Roles";
import { toast } from "react-toastify";
import { inviteUsers } from "@/apiCalls/invite";
import { setCollections } from "@/redux/reducers/collectionReducer";
import LoadingSpinner from "../LoadingSpinner";
import socket from "@/utils/socket";
const Modal = dynamic(() => import("./Modal"), { ssr: false });

const ShareCollectionModal = ({ show, setShow }: any) => {
  const dispatch: any = useDispatch();
  const { theme } = useSelector(
    (state: any) => state.userReducer,
    shallowEqual
  );
  const [users, setUsers] = useState<any>([]);
  const [searchedUsers, setSearchedUsers] = useState<any>([]);
  const [members, setMembers] = useState<any>(
    show?.members?.map((item: any) => item?.member?._id)
  );
  const [membersObj, setMembersObj] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchUser, setSearchUser] = useState<string>("");

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchUser(e.target.value);

    setTimeout(() => {
      const data: any = users?.filter((user: any) =>
        user?.name?.toLowerCase()?.includes(e.target.value)
      );
      console.log("data: ", data);
      setSearchedUsers(data);
    }, 1500);
  };

  const fetchAllUsers = async () => {
    try {
      setIsLoading(true);
      const res: any = await getAllUsers();
      if (res.success) {
        setUsers(res.users);
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.log(
        "Error in fetchinh users, in ShareCollectionModal: ",
        error.response.data.error
      );
    }
  };

  const sendInvite = async () => {
    try {
      setIsLoading(true);
      const res: any = await inviteUsers({ id: show?._id, membersObj });
      if (res.success) {
        dispatch(setCollections({ collections: res.collections }));
        membersObj.forEach((item: any) => {
          socket.emit("invite-sent", {
            userId: item?.member,
            collectionId: show?._id,
          });
        });
        toast.success("Invitation sent successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setIsLoading(false);
        setShow(null);
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.response.data.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, [show?._id, members?.length]);

  useEffect(() => {
    let data: any[] = [];
    for (let memberObj of show?.members) {
      const obj = {
        member: memberObj?.member?._id,
        role: memberObj?.role,
      };
      data.push(obj);
    }
    setMembersObj(data);
  }, []);

  return ReactDom.createPortal(
    <>
      {isLoading && <LoadingSpinner />}
      <Modal>
        <div
          id="preview"
          className={`h-[500px] w-[90%] xs:w-[80%] sm:w-[450px] md_link:w-[450px] mx-auto rounded-md ${
            theme === "dark"
              ? "shadow-dark-menuShadow"
              : "shadow-light-menuShadow"
          }`}
        >
          <div
            className={`relative h-full w-full my-[10%] 
          p-4 flex flex-col justify-start items-center gap-4 
          rounded-md ${
            theme === "dark"
              ? "text-dark-primary bg-dark-secondary"
              : "text-dark-secondary bg-slate-400"
          }`}
          >
            <h1 className={`text-2xl font-bold`}>Share Collection</h1>

            <div
              className={`h-auto w-full flex flex-col justify-start items-center gap-2`}
            >
              <p className={`text-lg`}>{show?.name}</p>
            </div>

            <div
              className={`h-full w-full p-4 flex flex-col justify-start items-center gap-2
          border ${
            theme === "dark" ? "border-dark-primary" : "border-dark-secondary"
          } rounded-md overflow-y-scroll`}
            >
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search users..."
                value={searchUser}
                onChange={onSearchChange}
                className={`w-full py-2 px-4 rounded-md ${
                  theme === "dark" ? "bg-dark-primary" : "bg-slate-500"
                } outline-none`}
              />

              {users?.length === 0 ? (
                <p>No users to show</p>
              ) : (
                <div
                  className={`h-full w-full my-3 flex flex-col justify-start items-start gap-3 overflow-y-scroll`}
                >
                  {searchUser === "" ? (
                    users?.map((user: any) => {
                      return (
                        <Roles
                          key={user?._id}
                          user={user}
                          members={members}
                          users={users}
                          setMembers={setMembers}
                          membersObj={membersObj}
                          setMembersObj={setMembersObj}
                          theme={theme}
                        />
                      );
                    })
                  ) : searchedUsers?.length === 0 ? (
                    <p>No users to show</p>
                  ) : (
                    searchedUsers?.map((user: any) => {
                      return (
                        <Roles
                          key={user?._id}
                          user={user}
                          members={members}
                          users={users}
                          setMembers={setMembers}
                          membersObj={membersObj}
                          setMembersObj={setMembersObj}
                          theme={theme}
                        />
                      );
                    })
                  )}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={sendInvite}
              className={`w-full py-2 px-4 border ${
                theme === "dark"
                  ? "border-dark-primary hover:bg-dark-primary"
                  : "border-dark-secondary hover:bg-dark-primary-btn "
              } rounded-md 
                transition-all duration-300 bg-transparent`}
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => setShow(null)}
              className={`w-full py-2 px-4 border ${
                theme === "dark"
                  ? "border-dark-primary hover:bg-dark-primary"
                  : "border-dark-secondary hover:bg-dark-primary-btn "
              } rounded-md 
                transition-all duration-300 bg-transparent`}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>,
    document.getElementById("modal")!
  );
};

export default ShareCollectionModal;
