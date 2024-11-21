import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BiTime } from "react-icons/bi";

function FlexTravelItem({ travel }) {
   return (
      <>
         <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{travel.category}</span>
         </div>
         <div className="flex items-center gap-2">
            <FaRegCalendarAlt className="text-subMain w-3 h-3" />
            <span className="text-sm font-medium">{travel.year}</span>
         </div>
         <div className="flex items-center gap-2">
            <BiTime className="text-subMain w-3 h-3" />
            <span className="text-sm font-medium">{travel.time} Hr</span>
         </div>
      </>
   );
}

export default FlexTravelItem;
