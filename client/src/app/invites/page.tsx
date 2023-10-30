"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { acceptInvite, getAllInvites, rejectInvite } from "@/apiCalls/invite";
import { setInvites } from "@/redux/reducers/inviteReducer";
import { toast } from "react-toastify";

const InvitePage = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { user } = useSelector((state: any) => state.userReducer, shallowEqual);
  const { invites } = useSelector(
    (state: any) => state.inviteReducer,
    shallowEqual
  );

  const fetchAllInvites = async () => {
    try {
      const res: any = await getAllInvites();
      console.log("res: ", res);
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

  return (
    <div
      className={`min-h-[90vh] w-full p-8 text-dark-primary flex flex-col justify-start items-start gap-4`}
    >
      <h1 className={`text-2xl font-bold`}>Invites</h1>

      {invites?.length === 0 ? (
        <p className={`text-lg`}>No invites to show</p>
      ) : (
        <div
          className={`w-[400px] flex flex-col justify-start items-start gap-2`}
        >
          {invites?.map((invite: any) => {
            return (
              <div
                key={invite?._id}
                className={`w-full py-3 px-4 flex justify-start items-center gap-4 
                rounded-md bg-dark-primary`}
              >
                <p>{invite?.targetCollection?.name}</p>
                {invite?.status === "pending" ? (
                  <>
                    <p
                      onClick={() => onAccept(invite?._id)}
                      className={`text-dark-primary cursor-pointer`}
                    >
                      Accept
                    </p>
                    <p
                      onClick={() => onReject(invite?._id)}
                      className={`text-red-600 cursor-pointer`}
                    >
                      Reject
                    </p>
                  </>
                ) : (
                  <p className={`text-slate-400`}>{invite?.status}</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InvitePage;
