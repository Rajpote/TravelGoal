import React from "react";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTravelByIdAction } from "../Redux/Actions/TravelsAction";
import { IfTravelLiked, LikeTravel } from "../Context/Functionalities";

function Travel({ travel }) {
   const dispatch = useDispatch();
   const gatData = () => {
      dispatch(getTravelByIdAction(travel?._id));
   };
   const { isLoading } = useSelector((state) => state.userLikeTravel);
   const { userInfo } = useSelector((state) => state.userLogin);
   const isLiked = IfTravelLiked(travel);

   return (
      <>
         <div className="border border-border p-1 hover:scale-95 transition relative rounded overflow-hidden">
            <div onClick={gatData}>
               <Link to={`/travel/${encodeURIComponent(travel?._id)}`} className="w-full">
                  <img src={travel?.image ? travel?.image : "/image/user.png"} alt={travel?.name} className="w-full h-64 object-cover" />
               </Link>
            </div>
            <div className="absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3">
               <h3 className="font-semibold truncate">{travel?.name}</h3>
               <button
                  onClick={() => LikeTravel(travel, dispatch, userInfo)}
                  disabled={isLiked || isLoading}
                  className={`h-9 w-9 text-sm flex-colo transitions
                     ${isLiked ? "bg-transparent" : "bg-subMain"}
                     hover:bg-transparent border-2 border-subMain rounded-md bg-subMain text-white`}
               >
                  <FaHeart />
               </button>
            </div>
         </div>
      </>
   );
}

export default Travel;
