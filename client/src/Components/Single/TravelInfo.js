import React from "react";
import FlexTravelItem from "../FlexTravelItem";
import { FaShareAlt } from "react-icons/fa";
import Rating from "../Star";

function TravelInfo({ travel, setModalOpen }) {
   return (
      <div className="w-full xl:h-screen relative text-white">
         <img src={travel?.image ? travel?.image : "/image/user.png"} alt={travel?.name} className="w-full h-full object-cover hidden xl:block" />
         <div className="xl:bg-main bg-dry flex-colo xl:bg-opacity-80 xl:absolute top-0 left-0 right-0 bottom-0">
            <div className="container px-3 mx-auto 2xl:px-32 xl:grid grid-cols-3 flex-colo py-10 lg:py-20 gap-8">
               <div className="xl:col-span-1 w-full order-last xl:order-none h-header bg-dry border border-gray-800 rounded-lg overflow-hidden">
                  <img src={travel?.titleImage ? travel?.titleImage : "/image/user.png"} alt={travel?.name} className="w-full h-full object-cover" />
               </div>
               <div className="col-span-2 grid grid-cols-5 gap-4 items-center">
                  <div className="col-span-5 flex flex-col gap-10">
                     <h1 className="xl:text-4xl text-2xl font-bold capitalize">{travel?.name}</h1>
                     <div className="flex items-center gap-4 font-medium text-dryGray">
                        <FlexTravelItem travel={travel} />
                        {/* share */}
                        <div onClick={() => setModalOpen(true)} className="col-span-1 flex-colo border-l border-border">
                           <button className="w-10 h-10 flex-colo rounded-lg bg-white bg-opacity-20">
                              <FaShareAlt />
                           </button>
                        </div>
                     </div>
                     {/* desc */}
                     <p className="text-text text-sm leading-7">{travel?.desc}</p>
                  </div>
                  {/* rating */}
                  <div className="flex mb-6 text-lg gap-2 text-star">
                     <Rating value={travel?.rate} />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default TravelInfo;
