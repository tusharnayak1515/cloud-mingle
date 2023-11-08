import React, { useState } from "react";
import ReactDom from "react-dom";
import Modal from "./Modal";
import { toast } from "react-toastify";
import { updatePassword } from "@/apiCalls/auth";
import { shallowEqual, useSelector } from "react-redux";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;

const ChangePasswordModal = ({ setIsChangePassword, setIsLoading }: any) => {
  const { theme } = useSelector(
    (state: any) => state.userReducer,
    shallowEqual
  );

  const [file, setFile] = useState<any>(null);
  const initPasswordDetails: any = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const [passwordDetails, setPasswordDetails] = useState(initPasswordDetails);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setPasswordDetails({ ...passwordDetails, [name]: value });
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = passwordDetails;
    try {
      setIsLoading(true);
      if (
        oldPassword.replace("/s/g", "").trim().length !== 0 &&
        passwordRegex.test(newPassword) &&
        newPassword === confirmPassword
      ) {
        const res: any = await updatePassword({
          oldPassword,
          newPassword,
          confirmPassword,
        });
        if (res.success) {
          setIsLoading(false);
          setFile(null);
          setPasswordDetails(initPasswordDetails);
          setIsChangePassword(false);
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
      } else if (oldPassword.replace("/s/g", "").trim().length === 0) {
        setIsLoading(false);
        toast.error("Old Password cannot be empty", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (!passwordRegex.test(newPassword)) {
        setIsLoading(false);
        toast.error(
          `Invalid new password! It must be minimum 8 characters long, having a minimum of uppercase, lowercase, special character, number`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      } else {
        setIsLoading(false);
        toast.error(`New password and confirm password must be same`, {
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

  return ReactDom.createPortal(
    <>
      <Modal>
        <form
          onSubmit={onSubmitHandler}
          className={`w-[90%] xxxs:w-[400px] sm:w-[500px] my-8 mx-auto p-6 
          ${
            theme === "dark"
              ? "text-dark-primary bg-dark-secondary shadow-dark-menuShadow"
              : "text-dark-secondary bg-slate-400 shadow-light-menuShadow"
          } 
          flex flex-col justify-start items-center gap-4 
          rounded-md`}
        >
          <p className={`text-2xl font-bold`}>Update Password</p>

          <div
            className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
          >
            <label htmlFor="oldPassword">Old Password</label>
            <input
              type="password"
              name="oldPassword"
              id="oldPassword"
              placeholder="********"
              className={`w-full py-2 px-4 rounded-md 
              border border-transparent
              ${
                theme === "dark"
                  ? "bg-dark-primary focus:border-dark-primary"
                  : "bg-slate-500 focus:border-dark-secondary"
              }
              outline-none`}
              value={passwordDetails?.oldPassword}
              onChange={onChangeHandler}
            />
          </div>

          <div
            className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
          >
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              placeholder="********"
              className={`w-full py-2 px-4 rounded-md 
              border border-transparent
              ${
                theme === "dark"
                  ? "bg-dark-primary focus:border-dark-primary"
                  : "bg-slate-500 focus:border-dark-secondary"
              }
              outline-none`}
              value={passwordDetails?.newPassword}
              onChange={onChangeHandler}
            />
          </div>

          <div
            className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
          >
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="********"
              className={`w-full py-2 px-4 rounded-md 
              border border-transparent
              ${
                theme === "dark"
                  ? "bg-dark-primary focus:border-dark-primary"
                  : "bg-slate-500 focus:border-dark-secondary"
              }
              outline-none`}
              value={passwordDetails?.confirmPassword}
              onChange={onChangeHandler}
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 ${
              theme === "dark"
                ? "text-dark-secondary bg-dark-primary-btn hover:bg-dark-secondary-btn"
                : "text-dark-primary bg-dark-primary hover:opacity-[0.85]"
            } rounded-md 
            transition-all duration-300`}
          >
            Submit
          </button>

          <button
            type="button"
            onClick={() => setIsChangePassword(false)}
            className={`w-full py-2 px-4 ${
              theme === "dark"
                ? "text-dark-secondary bg-dark-primary-btn hover:bg-dark-secondary-btn"
                : "text-dark-primary bg-dark-primary hover:opacity-[0.85]"
            } rounded-md 
            transition-all duration-300`}
          >
            Cancel
          </button>
        </form>
      </Modal>
    </>,
    document.getElementById("modal")!
  );
};

export default ChangePasswordModal;
