"use client";

import { sendOtp, userSignup } from "@/apiCalls/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiLogoGoogle } from "react-icons/bi";
import { shallowEqual, useSelector } from "react-redux";
import { toast } from "react-toastify";

const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;

const Signup = () => {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.userReducer, shallowEqual);

  const initUserDetails = {
    name: "",
    email: "",
    password: "",
    otp: "",
  };
  const [userDetails, setUserDetails] = useState(initUserDetails);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const onOtpSend = async () => {
    try {
      if (!emailRegex.test(userDetails.email)) {
        toast.error("Invalid email", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        setIsLoading(true);
        const res: any = await sendOtp({ email: userDetails?.email });
        if (res.success) {
          setIsLoading(false);
          setOtpSent(true);
          toast.success("OTP sent successfully", {
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

  const onRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password, otp } = userDetails;
    try {
      setIsLoading(true);
      if (
        name.replace("/s/g", "").trim().length !== 0 &&
        emailRegex.test(email) &&
        passwordRegex.test(password) &&
        otp.toString().length === 4
      ) {
        setIsLoading(true);
        const res = await userSignup({
          name,
          email,
          password,
          otp: parseInt(otp),
        });
        if (res.success) {
          setIsLoading(false);
          setUserDetails({ name: "", email: "", password: "", otp: "" });
          router.push("/signin");
          toast.success("Registration successfull", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else if (name.replace("/s/g", "").trim().length === 0) {
        toast.error("Name cannot be empty", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
      } else if (!passwordRegex.test(password)) {
        toast.error("Enter a strong password", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Invalid OTP", {
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

  const googleAuth = () => {
    window.open(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google/callback`,
      "_self"
    );
  };

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user]);

  return (
    <div
      className={`min-h-[100vh] w-full flex flex-col justify-start items-center bg-dark-primary`}
    >
      <form
        className={`h-auto w-[90%] xxxs:w-[400px] my-[6rem] p-4 text-dark-primary
      flex flex-col justify-start items-center gap-4 shadow-dark-menuShadow
      rounded-md bg-dark-secondary`}
        onSubmit={otpSent ? onRegister : onOtpSend}
      >
        <h1 className={`text-2xl font-bold`}>Signup</h1>

        <div
          className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="John Doe"
            value={userDetails?.name}
            onChange={onChangeHandler}
            readOnly={otpSent}
            className={`w-full py-2 px-4 rounded-md 
            border border-transparent focus:border-dark-primary
            bg-dark-primary outline-none`}
          />
        </div>

        <div
          className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@gmail.com"
            value={userDetails?.email}
            onChange={onChangeHandler}
            readOnly={otpSent}
            className={`w-full py-2 px-4 rounded-md 
            border border-transparent focus:border-dark-primary
            bg-dark-primary outline-none`}
          />
        </div>

        <div
          className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="********"
            value={userDetails?.password}
            onChange={onChangeHandler}
            readOnly={otpSent}
            className={`w-full py-2 px-4 rounded-md 
            border border-transparent focus:border-dark-primary
            bg-dark-primary outline-none`}
          />
        </div>

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
              className={`w-full py-2 px-4 rounded-md 
            border border-transparent focus:border-dark-primary
            bg-dark-primary outline-none`}
            />
          </div>
        )}

        <button
          type="submit"
          className={`w-full py-2 px-4 
            border border-dark-primary rounded-md hover:bg-dark-hover
        bg-dark-primary transition-all duration-300`}
        >
          Signup
        </button>

        <div className={`w-full flex justify-between items-center gap-2`}>
          <div className={`w-full border border-dark-primary`}></div>
          <p className={`text-slate-400`}>OR</p>
          <div className={`w-full border border-dark-primary`}></div>
        </div>

        <button
          type="button"
          className={`w-full py-2 px-4 text-dark-primary 
              flex justify-center items-center gap-[0.3rem] 
              border border-dark-primary rounded-md
            hover:bg-dark-primary bg-dark-secondary transition-all duration-300`}
          onClick={googleAuth}
        >
          <BiLogoGoogle className={`text-2xl`} />
          <span>Continue with Google</span>
        </button>

        <p>
          Already have an account?{" "}
          <Link href="/signin" className={`font-semibold`}>
            Signin
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
