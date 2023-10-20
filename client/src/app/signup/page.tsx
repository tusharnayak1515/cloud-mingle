"use client";

import Link from "next/link";
import React from "react";

const Signup = () => {
  return (
    <div
      className={`min-h-[100vh] w-full flex flex-col justify-start items-center bg-dark-primary`}
    >
      <form
        className={`h-auto w-[400px] my-[6rem] p-4 text-dark-primary
      flex flex-col justify-start items-center gap-4 shadow-dark-menuShadow
      rounded-md bg-dark-secondary`}
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
            className={`w-full py-2 px-4 rounded-md 
            border border-transparent focus:border-dark-primary
            bg-dark-primary outline-none`}
          />
        </div>

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

        <button
          type="submit"
          className={`w-full py-2 px-4 
            border border-dark-primary rounded-md hover:bg-dark-hover
        bg-dark-primary transition-all duration-300`}
        >
          Signup
        </button>

        <p>
          Already have an account? <Link href="/signin" className={`font-semibold`}>Signin</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
