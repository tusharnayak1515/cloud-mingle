"use client";

import { getProfile } from "@/apiCalls/auth";
import LoadingSpinner from "@/components/LoadingSpinner";
import { setProfile } from "@/redux/reducers/userReducer";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
const UpdateProfileModal = dynamic(
  () => import("@/components/modals/UpdateProfileModal"),
  { ssr: false }
);
const ChangePasswordModal = dynamic(
  () => import("@/components/modals/ChangePasswordModal"),
  { ssr: false }
);
const UserDetails = dynamic(() => import("@/components/profile/UserDetails"), {
  ssr: false,
});

const ProfilePage = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { user, profile } = useSelector(
    (state: any) => state.userReducer,
    shallowEqual
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUpdateProfile, setIsUpdateProfile] = useState<boolean>(false);
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const res: any = await getProfile();
      if (res.success) {
        localStorage.setItem("user_data", JSON.stringify(res.user));
        dispatch(setProfile({ user: res.user }));
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.log(
        "Error in fetching profile, in profile page: ",
        error.response.data.error
      );
    }
  };

  useEffect(() => {
    if (!user) {
      router.replace("/signin");
    } else {
      fetchProfile();
    }
  }, [user, router]);

  return (
    <div
      className={`min-h-[90vh] w-full p-8 text-dark-primary flex flex-col justify-start items-center gap-4`}
    >
      {isLoading && <LoadingSpinner />}
      {isUpdateProfile && (
        <UpdateProfileModal
          setIsUpdateProfile={setIsUpdateProfile}
          setIsLoading={setIsLoading}
        />
      )}
      {isChangePassword && (
        <ChangePasswordModal
          setIsChangePassword={setIsChangePassword}
          setIsLoading={setIsLoading}
        />
      )}

      <UserDetails profile={profile} />

      <button
        onClick={() => setIsUpdateProfile(true)}
        className={`py-2 px-4 text-sm xs:text-base text-dark-secondary 
        border-dark-primary rounded-md bg-dark-primary-btn 
        hover:bg-dark-secondary-btn transition-all duration-300`}
      >
        Update Profile
      </button>

      <button
        onClick={() => setIsChangePassword(true)}
        className={`py-2 px-4 text-sm xs:text-base text-dark-secondary 
        border-dark-primary rounded-md bg-dark-primary-btn 
        hover:bg-dark-secondary-btn transition-all duration-300`}
      >
        Change Password
      </button>
    </div>
  );
};

export default ProfilePage;
