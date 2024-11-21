import React from "react";
import MainModal from "./MainModal";
import { FaFacebook, FaTwitter, FaViber } from "react-icons/fa";
import { FacebookShareButton, TwitterShareButton, ViberShareButton } from "react-share";

function ShareModal({ modalOpen, setModalOpen, travel }) {
   const shareData = [
      {
         icon: FaFacebook,
         shareButton: FacebookShareButton,
      },
      {
         icon: FaTwitter,
         shareButton: TwitterShareButton,
      },
      {
         icon: FaViber,
         shareButton: ViberShareButton,
      },
   ];

   const url = `${window.location.protocol}//${window.location.host}/travel/${travel?._id}`;

   return (
      <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
         <div className="inline-block w-full h-full border border-border align-middle p-10 overflow-y-auto bg-main text-white rounded-2xl">
            <h2 className="text-2xl">
               Share <span className="text-xl font-bold">"{travel?.name}"</span>
            </h2>
            <form className="flex-rows flex-wrap gap-6 mt-6">
               {shareData.map((data, index) => (
                  <data.shareButton key={index} url={url} quote="Travel Destination Site">
                     <div className="w-12 transitions hover:bg-subMain flex-colo text-lg h-12 bg-white rounded bg-opacity-30">
                        <data.icon />
                     </div>
                  </data.shareButton>
               ))}
            </form>
            {/* <button className="w-full flex-colo transitions py-3 font-bold hover:bg-dry border-2 border-subMain rounded bg-subMain text-white">Share</button> */}
         </div>
      </MainModal>
   );
}

export default ShareModal;
