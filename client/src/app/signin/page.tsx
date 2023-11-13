"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { toast } from "react-toastify";
import { userSignin } from "@/apiCalls/auth";
import { setCookie } from "cookies-next";
import { setProfile, setTheme, setUser } from "@/redux/reducers/userReducer";
import LoadingSpinner from "@/components/LoadingSpinner";
import { BiLogoGoogle } from "react-icons/bi";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
const ResetPasswordModal = dynamic(
  () => import("@/components/modals/ResetPasswordModal"),
  { ssr: false }
);

const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

const Signin = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { user, theme } = useSelector(
    (state: any) => state.userReducer,
    shallowEqual
  );

  const initState = {
    email: "",
    password: "",
  };
  const [userDetails, setUserDetails] = useState<any>(initState);
  const [isResetPassword, setIsResetPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const onSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { email, password } = userDetails;
      if (
        emailRegex.test(email) &&
        password.replace("/s/g", "").trim().length !== 0
      ) {
        const res: any = await userSignin({ email, password });
        if (res.success) {
          setCookie("authorization", res.token, { maxAge: 60 * 60 * 24 });
          localStorage.setItem("user_data", JSON.stringify(res.user));
          dispatch(setUser({ token: res.token }));
          dispatch(setProfile({ user: res.user }));
          setIsLoading(false);
          toast.success("Welcome back", {
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
        setIsLoading(false);
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
        setIsLoading(false);
        toast.error("Password cannot be empty", {
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

  const onToggleTheme = () => {
    if (theme === "dark") {
      setCookie("theme", "light");
      dispatch(setTheme({ theme: "light" }));
    } else {
      setCookie("theme", "dark");
      dispatch(setTheme({ theme: "dark" }));
    }
  };

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user]);

  return (
    <div
      className={`min-h-[100vh] w-full flex flex-col justify-start items-center ${
        theme === "dark" ? "bg-dark-primary" : "bg-slate-200"
      }`}
    >
      {isLoading && <LoadingSpinner />}

      {isResetPassword && (
        <ResetPasswordModal setIsResetPassword={setIsResetPassword} />
      )}

      <div
        className={`absolute top-[20px] right-[100px] ${
          theme === "dark" ? "text-dark-primary" : "text-dark-secondary"
        }`}
      >
        {theme === "dark" ? (
          <BsFillSunFill
            className={`text-2xl cursor-pointer`}
            onClick={onToggleTheme}
          />
        ) : (
          <BsFillMoonFill
            className={`text-2xl cursor-pointer`}
            onClick={onToggleTheme}
          />
        )}
      </div>

      <form
        onSubmit={onSignin}
        className={`h-auto w-[90%] xxxs:w-[400px] my-[7rem] p-4
        flex flex-col justify-start items-center gap-4
        rounded-md ${
          theme === "dark"
            ? "text-dark-primary bg-dark-secondary shadow-dark-menuShadow"
            : "text-dark-secondary bg-slate-400 shadow-light-menuShadow"
          }`
        }
      >
        <h1 className={`text-2xl font-bold`}>Signin</h1>

        <div
          className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@gmail.com"
            className={`w-full py-2 px-4 rounded-md 
            border border-transparent
            ${
              theme === "dark"
                ? "focus:border-dark-primary bg-dark-primary"
                : "focus:border-dark-secondary bg-slate-500"
            }
           outline-none`}
            value={userDetails.email}
            onChange={onChangeHandler}
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
            className={`w-full py-2 px-4 rounded-md 
            border border-transparent
            ${
              theme === "dark"
                ? "focus:border-dark-primary bg-dark-primary"
                : "focus:border-dark-secondary bg-slate-500"
            }
           outline-none`}
            value={userDetails.password}
            onChange={onChangeHandler}
          />
        </div>

        <div className={`w-full flex justify-end items-center`}>
          <p
            className={`text-sm font-semibold cursor-pointer hover:underline`}
            onClick={() => setIsResetPassword(true)}
          >
            Forgot password?
          </p>
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 
          border rounded-md
          ${
            theme === "dark"
              ? "text-dark-primary border-dark-primary hover:bg-dark-hover bg-dark-primary"
              : "text-dark-secondary border-dark-secondary hover:bg-slate-500 bg-slate-400"
          } transition-all duration-300`}
        >
          Signin
        </button>

        <div className={`w-full flex justify-between items-center gap-2`}>
          <div
            className={`w-full border ${
              theme === "dark" ? "border-dark-primary" : "border-dark-secondary"
            }`}
          ></div>
          <p
            className={`${
              theme === "dark" ? "text-slate-400" : "text-dark-secondary"
            }`}
          >
            OR
          </p>
          <div
            className={`w-full border ${
              theme === "dark" ? "border-dark-primary" : "border-dark-secondary"
            }`}
          ></div>
        </div>

        <button
          type="button"
          className={`w-full py-2 px-4 
              flex justify-center items-center gap-[0.3rem] 
              border rounded-md
            ${
              theme === "dark"
                ? "text-dark-primary border-dark-primary bg-dark-secondary hover:bg-dark-primary "
                : "text-dark-secondary border-dark-secondary bg-slate-400 hover:bg-slate-500 "
            } transition-all duration-300`}
          onClick={googleAuth}
        >
          <BiLogoGoogle className={`text-2xl`} />
          <span>Continue with Google</span>
        </button>

        <p>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className={`font-semibold`}>
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;
