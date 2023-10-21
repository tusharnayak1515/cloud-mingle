"use client";

import Image from "next/image";
import React from "react";

const Collection = ({ collection }: any) => {
  return (
    <div
      key={collection?._id}
      className={`w-full flex flex-col justify-start items-start`}
    >
      <p className={`w-full py-2 border-b border-dark-primary`}>
        {collection?.name}
      </p>

      {collection.files.map((file: any) => {
        const uint8Array = new Uint8Array(file?.data.data);
        const array = Array.from(uint8Array);
        const base64String = btoa(String.fromCharCode(...array));

        console.log("file: ", file);
        console.log("base64String: ", base64String);

        const blob = new Blob([uint8Array], { type: file?.contentType });

        console.log("blob: ",blob);
        
        const blobUrl = URL.createObjectURL(blob);

        console.log("blobUrl: ",blobUrl);

        return (
          <div key={file?._id} className={`w-full py-2`}>
            {/* <img
              src={`data:${file?.contentType};base64,${file?.data.data}`}
              alt={file?.name}
            /> */}
            {/* <Image
            //   src={`data:${file?.contentType};base64,${base64String}`}
              src={blobUrl}
              alt="File"
              height={100}
              width={100}
            //   className={`h-[100px] w-[100px]`}
            /> */}
            {/* <input type="file" value={base64String} /> */}
            <img src={blobUrl} alt="Collection Image" />
            <p>{file?.filename}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Collection;
