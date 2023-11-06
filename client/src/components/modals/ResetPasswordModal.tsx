"use client";

import React, { useState } from "react";
import ReactDom from "react-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner";
import { resetPassword, sendOtp } from "@/apiCalls/auth";

const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;

const ResetPasswordModal = ({ setIsResetPassword }: any) => {
  const [passwordDetails, setPasswordDetails] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setPasswordDetails({ ...passwordDetails, [name]: value });
  };

  const onResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { email, newPassword, confirmPassword, otp } = passwordDetails;
      if (
        emailRegex.test(email) &&
        passwordRegex.test(newPassword) &&
        newPassword === confirmPassword
      ) {
        const res: any = await resetPassword({
          ...passwordDetails,
          otp: Number(otp),
        });
        if (res.success) {
          setLoading(false);
          setIsResetPassword(false);
          toast.success("Password updated successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else if (!emailRegex.test(email)) {
        toast.error("Invalid email", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (!passwordRegex.test(newPassword)) {
        toast.error("Invalid new password", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (newPassword !== confirmPassword) {
        toast.error("Password mismatch", {
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
      setLoading(false);
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

  const onSendOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { email } = passwordDetails;
      if (emailRegex.test(email)) {
        const res: any = await sendOtp({ email });
        if (res.success) {
          setLoading(false);
          setOtpSent(true);
          toast.success(`Otp sent to ${email}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          setLoading(false);
          toast.error("Invalid email", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    } catch (error: any) {
      setLoading(false);
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

  return ReactDom.createPortal(
    <div className={`fixed inset-0 p-6 bg-[#0000005f] z-[600]`}>
      {loading && <LoadingSpinner />}
      <form
        className={`h-auto w-[100%] xxs:w-[350px] xs:w-[400px] md:w-[450px] overflow-y-scroll
        my-16 mx-auto text-dark-primary p-6 
        flex flex-col justify-start items-center gap-4 
        rounded-md shadow-dark-menuShadow bg-dark-secondary`}
        onSubmit={otpSent ? onResetPassword : onSendOtp}
      >
        <h1 className={`text-2xl font-bold`}>Reset Password</h1>

        {!otpSent && (
          <div
            className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
          >
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={passwordDetails?.email}
              onChange={onChangeHandler}
              className={`w-full py-2 px-4 border border-dark-primary rounded-md 
            outline-none bg-dark-hover`}
            />
          </div>
        )}

        {otpSent && (
          <div
            className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
          >
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              placeholder="New Password"
              value={passwordDetails?.newPassword}
              onChange={onChangeHandler}
              className={`w-full py-2 px-4 border border-dark-primary rounded-md 
              outline-none bg-dark-hover`}
            />
          </div>
        )}

        {otpSent && (
          <div
            className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
          >
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={passwordDetails?.confirmPassword}
              onChange={onChangeHandler}
              className={`w-full py-2 px-4 border border-dark-primary rounded-md 
            outline-none bg-dark-hover`}
            />
          </div>
        )}

        {otpSent && (
          <div
            className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
          >
            <label htmlFor="otp">OTP</label>
            <input
              type="number"
              name="otp"
              id="otp"
              placeholder="1234"
              value={passwordDetails?.otp}
              onChange={onChangeHandler}
              className={`w-full py-2 px-4 border border-dark-primary rounded-md 
            outline-none bg-dark-hover`}
            />
          </div>
        )}

        <button
          type="submit"
          className={`w-full py-2 px-4 
            border border-dark-primary rounded-md hover:bg-dark-hover
        bg-dark-primary transition-all duration-300`}
        >
          Submit
        </button>

        <button
          type="button"
          className={`w-full py-2 px-4 
            border border-dark-primary rounded-md hover:bg-dark-hover
        bg-dark-primary transition-all duration-300`}
          onClick={() => setIsResetPassword(false)}
        >
          Cancel
        </button>
      </form>
    </div>,
    document.getElementById("modal")!
  );
};

export default ResetPasswordModal;
