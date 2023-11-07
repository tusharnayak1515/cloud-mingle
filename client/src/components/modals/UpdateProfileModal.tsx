import React, { useState } from "react";
import ReactDom from "react-dom";
import Modal from "./Modal";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { toast } from "react-toastify";
import { updateProfile } from "@/apiCalls/auth";
import { setProfile } from "@/redux/reducers/userReducer";
import axios from "axios";

const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

const UpdateProfileModal = ({ setIsUpdateProfile, setIsLoading }: any) => {
  const dispatch: any = useDispatch();
  const { profile } = useSelector(
    (state: any) => state.userReducer,
    shallowEqual
  );

  const [file, setFile] = useState<any>(profile?.dp);
  const initUserDetails: any = {
    name: profile?.name,
    email: profile?.email,
    dp: profile?.dp,
  };
  const [userDetails, setUserDetails] = useState(initUserDetails);

  const onRemoveDp = () => {
    setFile(null);
    setUserDetails({
      ...userDetails,
      dp: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
    });
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      setFile(e.target.files[0]);
      setUserDetails({
        ...userDetails,
        dp: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, dp } = userDetails;
    try {
      setIsLoading(true);
      if (
        emailRegex.test(email) &&
        name.replace("/s/g", "").trim().length !== 0 &&
        (file !== null || dp !== null)
      ) {
        let userDp = null;
        if (file && file !== profile?.dp) {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "just_connect");
          data.append("cloud_name", "alpha2625");
          const response = await axios.post(
            "https://api.cloudinary.com/v1_1/alpha2625/image/upload",
            data
          );
          userDp = response.data.secure_url;
        } else if (file && file === profile?.dp) {
          userDp = profile?.dp;
        }
        const res: any = await updateProfile({ name, email, dp: userDp });
        if (res.success) {
          localStorage.setItem("user_data", JSON.stringify(res.user));
          dispatch(setProfile({ user: res.user }));
          setIsLoading(false);
          setFile(null);
          setUserDetails(initUserDetails);
          setIsUpdateProfile(false);
          toast.success("Profile updated successfully", {
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
        toast.error("Name cannot be empty", {
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
          className={`w-[90%] xxxs:w-[400px] sm:w-[500px] my-8 mx-auto p-6 text-dark-primary 
          flex flex-col justify-start items-center gap-4 
          rounded-md bg-dark-secondary shadow-dark-menuShadow`}
        >
          <p className={`text-2xl text-dark-primary font-bold`}>
            Update Profile
          </p>

          <label htmlFor="dp">
            <div
              className={`relative h-[150px] w-[150px] border-2 border-dark-primary rounded-full`}
            >
              <Image
                src={userDetails.dp}
                alt="User DP"
                fill
                className={`rounded-full`}
              />
            </div>
          </label>

          <button
            type="button"
            onClick={onRemoveDp}
            className={`py-2 px-4 text-dark-secondary rounded-md 
            bg-dark-primary-btn hover:bg-dark-secondary-btn transition-all duration-300`}
          >
            Remove
          </button>

          <input
            type="file"
            name="dp"
            id="dp"
            className={`hidden`}
            accept="image/*"
            onChange={onFileChange}
          />

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
              value={userDetails?.name}
              onChange={onChangeHandler}
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
              value={userDetails?.email}
              onChange={onChangeHandler}
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 text-dark-secondary rounded-md 
            bg-dark-primary-btn hover:bg-dark-secondary-btn transition-all duration-300`}
          >
            Submit
          </button>

          <button
            type="button"
            onClick={() => setIsUpdateProfile(false)}
            className={`w-full py-2 px-4 text-dark-secondary rounded-md 
            bg-dark-primary-btn hover:bg-dark-secondary-btn transition-all duration-300`}
          >
            Cancel
          </button>
        </form>
      </Modal>
    </>,
    document.getElementById("modal")!
  );
};

export default UpdateProfileModal;
