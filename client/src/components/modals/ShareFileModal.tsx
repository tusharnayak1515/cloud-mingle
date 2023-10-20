"use client";

import React from "react";
import dynamic from "next/dynamic";
import ReactDom from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
const Modal = dynamic(() => import("./Modal"), { ssr: false });

const ShareFileModal = ({ show, setShow }: any) => {
  const ImagePreview = ({ file }: any) => {
    return <img src={URL.createObjectURL(file)} className={`h-full w-full`} />;
  };

  const previewFile = () => {
    return <ImagePreview file={show} />;
  };

  return ReactDom.createPortal(
    <Modal>
      <div id="preview" className={`h-[500px] w-[40%] mx-auto`}>
        <div
          className={`relative h-full w-full my-[10%] 
          text-dark-primary p-4 flex flex-col justify-start items-center gap-4 
          rounded-md bg-dark-secondary`}
        >
          <h1 className={`text-2xl text-dark-primary font-bold`}>Share File</h1>
          <div
            className={`h-auto w-full flex flex-col justify-start items-center gap-2`}
          >
            <div className={`h-[100px] w-[100px]`}>{previewFile()}</div>
            <p>{show?.name}</p>
          </div>

          <div
            className={`h-full w-full p-4 flex flex-col justify-start items-center gap-2
          border border-dark-primary rounded-md overflow-y-scroll`}
          >
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search users..."
              className={`w-full py-2 px-4 rounded-md outline-none`}
            />

            <div className={`w-full flex flex-col justify-start items-start`}>
              
              <div className={`w-full p-3 flex justify-between items-center rounded-md cursor-pointer
              hover:bg-dark-primary bg-transparent transition-all duration-300`}>
                <div className={`flex justify-start items-center gap-4`}>
                  <div
                    className={`relative h-[30px] w-[30px] border border-dark-primary 
                    rounded-full overflow-hidden cursor-pointer`}
                  >
                    <Image
                      src={
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                      }
                      alt="dp"
                      fill
                    />
                  </div>
                  <p>John Doe</p>
                </div>

                <input type="checkbox" name="checkUser" id="checkUser" />
              </div>
              
              <div className={`w-full p-3 flex justify-between items-center rounded-md cursor-pointer
              hover:bg-dark-primary bg-transparent transition-all duration-300`}>
                <div className={`flex justify-start items-center gap-4`}>
                  <div
                    className={`relative h-[30px] w-[30px] border border-dark-primary 
                    rounded-full overflow-hidden cursor-pointer`}
                  >
                    <Image
                      src={
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                      }
                      alt="dp"
                      fill
                    />
                  </div>
                  <p>John Doe</p>
                </div>

                <input type="checkbox" name="checkUser" id="checkUser" />
              </div>
              
              <div className={`w-full p-3 flex justify-between items-center rounded-md cursor-pointer
              hover:bg-dark-primary bg-transparent transition-all duration-300`}>
                <div className={`flex justify-start items-center gap-4`}>
                  <div
                    className={`relative h-[30px] w-[30px] border border-dark-primary 
                    rounded-full overflow-hidden cursor-pointer`}
                  >
                    <Image
                      src={
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                      }
                      alt="dp"
                      fill
                    />
                  </div>
                  <p>John Doe</p>
                </div>

                <input type="checkbox" name="checkUser" id="checkUser" />
              </div>
              
              <div className={`w-full p-3 flex justify-between items-center rounded-md cursor-pointer
              hover:bg-dark-primary bg-transparent transition-all duration-300`}>
                <div className={`flex justify-start items-center gap-4`}>
                  <div
                    className={`relative h-[30px] w-[30px] border border-dark-primary 
                    rounded-full overflow-hidden cursor-pointer`}
                  >
                    <Image
                      src={
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                      }
                      alt="dp"
                      fill
                    />
                  </div>
                  <p>John Doe</p>
                </div>

                <input type="checkbox" name="checkUser" id="checkUser" />
              </div>
              
              <div className={`w-full p-3 flex justify-between items-center rounded-md cursor-pointer
              hover:bg-dark-primary bg-transparent transition-all duration-300`}>
                <div className={`flex justify-start items-center gap-4`}>
                  <div
                    className={`relative h-[30px] w-[30px] border border-dark-primary 
                    rounded-full overflow-hidden cursor-pointer`}
                  >
                    <Image
                      src={
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                      }
                      alt="dp"
                      fill
                    />
                  </div>
                  <p>John Doe</p>
                </div>

                <input type="checkbox" name="checkUser" id="checkUser" />
              </div>
              
              <div className={`w-full p-3 flex justify-between items-center rounded-md cursor-pointer
              hover:bg-dark-primary bg-transparent transition-all duration-300`}>
                <div className={`flex justify-start items-center gap-4`}>
                  <div
                    className={`relative h-[30px] w-[30px] border border-dark-primary 
                    rounded-full overflow-hidden cursor-pointer`}
                  >
                    <Image
                      src={
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                      }
                      alt="dp"
                      fill
                    />
                  </div>
                  <p>John Doe</p>
                </div>

                <input type="checkbox" name="checkUser" id="checkUser" />
              </div>

            </div>
          </div>
          <AiOutlineClose
            onClick={() => setShow(null)}
            className={`absolute left-[101%] top-[2%] text-3xl text-dark-primary cursor-pointer`}
          />
        </div>
      </div>
    </Modal>,
    document.getElementById("modal")!
  );
};

export default ShareFileModal;
