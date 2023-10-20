"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { toast } from "react-toastify";
import { userSignin } from "@/apiCalls/auth";
import { setCookie } from "cookies-next";
import { setProfile, setUser } from "@/redux/reducers/userReducer";

const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

const Signin = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { user } = useSelector((state: any) => state.userReducer, shallowEqual);

  const initState = {
    email: "",
    password: "",
  };
  const [userDetails, setUserDetails] = useState(initState);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const onSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { email, password } = userDetails;
      if (
        emailRegex.test(email) &&
        password.replace("/s/g", "").trim().length !== 0
      ) {
        const res: any = await userSignin({ email, password });
        if (res.success) {
          setCookie("authorization", res.token);
          dispatch(setUser({ token: res.token }));
          dispatch(setProfile({ user: res.user }));
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
      } else {
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
    if (user) {
      router.replace("/");
    }
  }, [user]);

  return (
    <div
      className={`min-h-[100vh] w-full flex flex-col justify-start items-center bg-dark-primary`}
    >
      <form
        onSubmit={onSignin}
        className={`h-auto w-[400px] my-[7rem] p-4 text-dark-primary
      flex flex-col justify-start items-center gap-4 shadow-dark-menuShadow
      rounded-md bg-dark-secondary`}
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
            border border-transparent focus:border-dark-primary
            bg-dark-primary outline-none`}
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
            border border-transparent focus:border-dark-primary
            bg-dark-primary outline-none`}
            value={userDetails.password}
            onChange={onChangeHandler}
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 
            border border-dark-primary rounded-md hover:bg-dark-hover
        bg-dark-primary transition-all duration-300`}
        >
          Signin
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
