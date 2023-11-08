"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { acceptInvite, getAllInvites, rejectInvite } from "@/apiCalls/invite";
import { setInvites } from "@/redux/reducers/inviteReducer";
import { toast } from "react-toastify";
import { AiOutlineCheck } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import socket from "@/utils/socket";

const InvitePage = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { user, profile, theme } = useSelector(
    (state: any) => state.userReducer,
    shallowEqual
  );
  const { invites } = useSelector(
    (state: any) => state.inviteReducer,
    shallowEqual
  );

  const fetchAllInvites = async () => {
    try {
      const res: any = await getAllInvites();
      if (res.success) {
        dispatch(setInvites({ invites: res.invites }));
      }
    } catch (error: any) {
      console.log(
        "Error in fetching all invites, in invites page: ",
        error.response.data.error
      );
    }
  };

  const onAccept = async (id: string) => {
    try {
      const res: any = await acceptInvite(id);
      if (res.success) {
        dispatch(setInvites({ invites: res.invites }));
        toast.success("Invite accepted successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error: any) {
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

  const onReject = async (id: string) => {
    try {
      const res: any = await rejectInvite(id);
      if (res.success) {
        dispatch(setInvites({ invites: res.invites }));
        toast.success("Invite rejected successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error: any) {
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
    if (!user) {
      router.replace("/signin");
    } else {
      fetchAllInvites();
    }
  }, [user, router]);

  useEffect(() => {
    socket.on("invite-received", (data: any) => {
      if (data) {
        fetchAllInvites();
      }
    });
  }, [socket]);

  useEffect(() => {
    socket.emit("setup", { collectionId: null, userId: profile?._id });
  }, []);

  return (
    <div
      className={`min-h-[90vh] w-full p-8 ${
        theme === "dark" ? "text-dark-primary" : "text-dark-secondary"
      } flex flex-col justify-start items-start gap-4`}
    >
      <h1 className={`text-2xl font-bold`}>Invites</h1>

      {invites?.length === 0 ? (
        <p className={`text-lg`}>No invites to show</p>
      ) : (
        <div className="w-full my-4 overflow-x-scroll md_link:overflow-x-clip sm:max-w-full">
          <table
            className={`h-full w-[600px] sm:w-full overflow-x-clip bg-transparent`}
          >
            <thead>
              <tr>
                <th className={`py-3 px-2 text-start`}>Collection</th>
                <th className={`py-3 px-2 text-start`}>Owner</th>
                <th className={`py-3 px-2 text-start`}>Role</th>
                <th className={`py-3 px-2 text-start`}>Status</th>
                <th className={`py-3 px-2 text-start`}>Accept</th>
                <th className={`py-3 px-2 text-start`}>Reject</th>
              </tr>
            </thead>

            <tbody>
              {invites?.map((invite: any) => {
                return (
                  <tr
                    key={invite?._id}
                    className={`border-t ${
                      theme === "dark"
                        ? "border-dark-primary"
                        : "border-dark-secondary"
                    } transition-all duration-300`}
                  >
                    <td className={`py-3 px-2 text-sm text-start font-[500]`}>
                      {invite?.targetCollection?.name}
                    </td>
                    <td className={`py-3 px-2 text-sm text-start font-[500]`}>
                      {invite?.targetCollection?.owner?.name}
                    </td>
                    <td className={`py-3 px-2 text-sm text-start font-[500]`}>
                      {invite?.role}
                    </td>
                    <td
                      className={`py-3 px-2 text-sm text-start ${
                        invite?.status === "accepted"
                          ? "text-green-500"
                          : invite?.status === "rejected"
                          ? "text-red-500"
                          : "text-gray-500"
                      } font-[500]`}
                    >
                      {invite?.status}
                    </td>
                    <td className={`py-3 px-2 text-sm text-start font-[500]`}>
                      <button
                        disabled={invite?.status !== "pending"}
                        onClick={() => onAccept(invite?._id)}
                      >
                        <AiOutlineCheck
                          className={`text-xl ${
                            invite?.status !== "pending"
                              ? "text-gray-400"
                              : "text-green-500 cursor-pointer"
                          }`}
                        />
                      </button>
                    </td>
                    <td className={`py-3 px-2 text-sm text-start font-[500]`}>
                      <button
                        disabled={invite?.status !== "pending"}
                        onClick={() => onReject(invite?._id)}
                      >
                        <RxCross2
                          className={`text-xl ${
                            invite?.status !== "pending"
                              ? "text-gray-400"
                              : "text-red-500 cursor-pointer"
                          }`}
                        />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InvitePage;
