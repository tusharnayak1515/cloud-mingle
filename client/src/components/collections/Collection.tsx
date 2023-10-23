"use client";

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

      {/* {collection.files.map((file: any) => {
        console.log("File:", file);
        console.log("File Data:", file?.data?.data);

        const buffer: Buffer = Buffer.from(file?.data?.data, "base64url");
        const blob = new Blob([buffer], { type: file.contentType });
        const blobUrl = URL.createObjectURL(blob);

        console.log("buffer:", buffer);
        console.log("Blob:", blob);
        console.log("Blob URL:", blobUrl);

        const myfile = new File([
          new Blob(["decoded_base64_String"])
        ], "output_file_name");

        return (
          <div key={file?._id} className={`w-full py-2`}>
            <p>{file?.filename}</p>
            <img src={blobUrl} alt={file?.filename} />
          </div>
        );
      })} */}
    </div>
  );
};

export default Collection;
