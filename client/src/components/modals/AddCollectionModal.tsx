"use client";

import React, { useState } from "react";
import ReactDom from "react-dom";
import Modal from "./Modal";
import { toast } from "react-toastify";
import { addCollection } from "@/apiCalls/collection";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setCollections } from "@/redux/reducers/collectionReducer";

const AddCollectionModal = ({ setShow }: any) => {
  const dispatch: any = useDispatch();
  const { theme } = useSelector(
    (state: any) => state.userReducer,
    shallowEqual
  );
  const [name, setName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const onAddCollection = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (name.replace("/s/g", "").trim().length === 0) {
        setIsLoading(false);
        toast.error("Collection name cannot be empty", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        const res: any = await addCollection({ name });
        if (res.success) {
          dispatch(setCollections({ collections: res.collections }));
          toast.success("Collection added successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setName("");
          setShow(false);
        }
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

  return ReactDom.createPortal(
    <Modal>
      <div
        id="preview"
        className={`h-[220px] w-[80%] xs:w-[350px] xl:w-[30%] mx-auto rounded-md ${
          theme === "dark"
            ? "shadow-dark-menuShadow"
            : "shadow-light-menuShadow"
        }`}
      >
        <form
          className={`h-full w-full my-20
          ${
            theme === "dark"
              ? "text-dark-primary bg-dark-secondary"
              : "text-dark-secondary bg-slate-400"
          }
             p-4 flex flex-col justify-start items-center gap-4 rounded-md overflow-hidden `}
          onSubmit={onAddCollection}
        >
          <p className={`text-xl xs:text-2xl font-bold`}>Add Collection</p>

          <div
            className={`w-full flex flex-col justify-start items-start gap-[0.2rem]`}
          >
            <label htmlFor="name">Collection Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Collection name"
              value={name}
              onChange={onChangeHandler}
              className={`w-full py-2 px-4 bg-dark-primary rounded-md outline-none`}
            />
          </div>

          <div className={`w-full grid grid-cols-2 gap-4`}>
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
              onClick={() => setShow(null)}
              className={`w-full py-2 px-4 ${
                theme === "dark"
                  ? "text-dark-secondary bg-dark-primary-btn hover:bg-dark-secondary-btn"
                  : "text-dark-primary bg-dark-primary hover:opacity-[0.85]"
              } rounded-md 
              transition-all duration-300`}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </Modal>,
    document.getElementById("modal")!
  );
};

export default AddCollectionModal;
