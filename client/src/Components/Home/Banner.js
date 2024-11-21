import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import FlexTravelItem from "../FlexTravelItem.js";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import Loader from "../Notifications/Loader.js";
import { Empty } from "../Notifications/Empty.js";
import { useDispatch, useSelector } from "react-redux";
import { IfTravelLiked, LikeTravel } from "../../Context/Functionalities.js";

const Swipper = ({ sameClass, travels }) => {
   const { isLoading } = useSelector((state) => state.userLikeTravel);
   const dispatch = useDispatch();
   const { userInfo } = useSelector((state) => state.userLogin);
   const isLiked = (travel) => {
      return IfTravelLiked(travel);
   };
   return (
      <Swiper direction="horizontal" spaceBetween={0} speed={1000} modules={[Autoplay]} loop={true} autoplay={{ delay: 4000, disableOnInteraction: false }} className={sameClass} autoHeight={false}>
         {travels?.slice(0, 6).map((travel, index) => (
            <SwiperSlide key={index} className="relative rounded overflow-hidden">
               <img src={travel?.image ? travel.image : "/image/user.png"} alt={travel?.name} className="w-full h-[400px] lg:h-[666px] object-cover" />
               <div className="absolute linear-bg xl:pl-48 sm:pl-32 pl-8 top-0 bottom-0 right-0 left-0 flex flex-col justify-center lg:gap-8 md:gap-5 gap-4">
                  <h1 className="text-xl xl:text-4xl font-bold text-white truncate capitalize font-sans sm:text-2xl">{travel?.name}</h1>
                  <div className="flex gap-5 items-center text-dryGray">
                     <FlexTravelItem travel={travel} />
                  </div>
                  <div className="flex gap-4 items-center">
                     <Link to={`/travel/${encodeURIComponent(travel?._id)}`} className="bg-subMain hover:text-main transitions text-white px-8 py-3 rounded font-medium sm:text-sm text-xs">
                        Visit Now
                     </Link>
                     <button
                        onClick={() => LikeTravel(travel, dispatch, userInfo)}
                        disabled={isLiked(travel) || isLoading}
                        className={`bg-white
                           ${isLiked(travel) ? "text-subMain" : "text-white"}
                           hover:text-subMain transitions px-4 py-3 rounded text-sm bg-opacity-30`}
                     >
                        <FaHeart />
                     </button>
                  </div>
               </div>
            </SwiperSlide>
         ))}
      </Swiper>
   );
};

function Banner({ travels, isLoading }) {
   const sameClass = "w-full flex-colo bg-dry min-h-32 lg-min-h-64";
   return (
      <div className="relative w-full">
         {isLoading ? (
            <div className={sameClass}>
               <Loader />
            </div>
         ) : travels?.length > 0 ? (
            <Swipper sameClass={sameClass} travels={travels} />
         ) : (
            <div className={sameClass}>
               <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
                  <Empty />
               </div>
               <p className="text-border text-sm">Travel not found</p>
            </div>
         )}
      </div>
   );
}

export default Banner;
