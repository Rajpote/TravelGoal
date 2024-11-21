import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import Loader from "./Notifications/Loader";
import { uploadImageService } from "../Redux/APIs/ImageUploadService";

function Uploader({ setImageUrl }) {
   const [loading, setloading] = useState(false);

   // upload file
   const onDrop = useCallback(
      async (acceptedFiles) => {
         const file = new FormData();
         file.append("file", acceptedFiles[0]);
         const data = await uploadImageService(file, setloading);
         setImageUrl(data);
      },
      [setImageUrl]
   );

   const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
      multiple: false,
      onDrop,
      accept: {
         "image/jpeg": [".jpg", ".jpeg"],
         "image/png": [".png"],
      },
   });

   return (
      <div className="w-full text-center flex-colo gap-6">
         {loading ? (
            <div className="px-6 w-full py-8 border-2 border-border border-dashed bg-dry rounded-md">
               <Loader />
            </div>
         ) : (
            <div {...getRootProps()} className="px-6 w-full py-8 border-2 border-border border-dashed bg-main">
               <input {...getInputProps()} />
               <span className="mx-auto flex-colo text-subMain text-3xl">
                  <FiUploadCloud />
               </span>
               <p className="text-text mt-2">Drag your image</p>
               <em className="text-xs text-border">{isDragActive ? "Drop it" : isDragReject ? "Unsupported file type..." : "Only .jpg and .png files will be accepted"}</em>
            </div>
         )}
      </div>
   );
}

export default Uploader;
