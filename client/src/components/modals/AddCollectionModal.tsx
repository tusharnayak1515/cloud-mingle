"use client";

import React, { useState } from "react";
import ReactDom from "react-dom";
import Modal from "./Modal";
import { toast } from "react-toastify";
import { addCollection } from "@/apiCalls/collection";
import { useDispatch } from "react-redux";
import { setCollections } from "@/redux/reducers/collectionReducer";

const AddCollectionModal = ({ setShow }: any) => {
  const dispatch: any = useDispatch();
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
          dispatch(setCollections({collections: res.collections}));
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
      <div id="preview" className={`h-[220px] w-[30%] mx-auto `}>
        <form
          className={`h-full w-full my-[20%] 
            text-dark-primary p-4 flex flex-col justify-start items-center gap-4 rounded-md overflow-hidden bg-dark-secondary`}
          onSubmit={onAddCollection}
        >
          <p className={`text-2xl font-bold`}>Add Collection</p>

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
              className={`py-2 px-4 text-dark-secondary rounded-md 
              hover:bg-dark-secondary-btn bg-dark-primary-btn transition-all duration-300`}
            >
              Submit
            </button>

            <button
              type="button"
              onClick={() => setShow(null)}
              className={`py-2 px-4 text-dark-secondary rounded-md 
              hover:bg-dark-secondary-btn bg-dark-primary-btn transition-all duration-300`}
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
