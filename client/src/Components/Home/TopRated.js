import React, { useState } from "react";
import Titles from "../Titles";
import { BsBookmarkStarFill, BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Rating from "../Star.js";
import Loader from "../Notifications/Loader.js";
import { Empty } from "../Notifications/Empty.js";
import { useDispatch, useSelector } from "react-redux";
import { IfTravelLiked, LikeTravel } from "../../Context/Functionalities.js";

const SwiperTop = ({ prevEl, nextEl, travels }) => {
   const dispatch = useDispatch();
   const { isLoading } = useSelector((state) => state.userLikeTravel);
   const { userInfo } = useSelector((state) => state.userLogin);
   const isLiked = (travel) => {
      return IfTravelLiked(travel);
   };

   return (
      <Swiper
         navigation={{ nextEl, prevEl }}
         slidesPerView={4}
         spaceBetween={40}
         autoplay={{ delay: 3000 }}
         speed={1000}
         // loop={true}
         modules={[Navigation, Autoplay]}
         breakpoints={{
            320: { slidesPerView: 1 }, // For very small screens
            640: { slidesPerView: 2 }, // For small screens like phones
            768: { slidesPerView: 3 }, // For tablets
            1024: { slidesPerView: 4 }, // For laptops/desktops
         }}
      >
         {travels?.map((travel, index) => (
            <SwiperSlide key={index}>
               <div className="p-4 h-rate hovered border border-border bg-dry rounded-lg overflow-hidden">
                  <img src={travel?.image ? travel?.image : "/image/user.png"} alt={travel?.name} className="w-full h-full object-cover rounded-lg" />
                  <div className="px-4 hoveres gap-6 text-center absolute bg-black bg-opacity-70 top-0 left-0 right-0 bottom-0 overflow-hidden">
                     <button
                        onClick={() => LikeTravel(travel, dispatch, userInfo)}
                        disabled={!!isLiked(travel) || isLoading}
                        className={`w-12 h-12 flex-colo transitions hover:bg-subMain rounded-full 
                           ${isLiked(travel) ? "bg-subMain" : "bg-white bg-opacity-30"}
                             text-white`}
                     >
                        <FaHeart />
                     </button>
                     <Link to={`/travel/${encodeURIComponent(travel?._id)}`} className="font-semibold text-xl truncate line-clamp-2">
                        {travel?.name}
                     </Link>
                     <div className="flex gap-2 text-star">
                        <Rating value={travel?.rate} />
                     </div>
                  </div>
               </div>
            </SwiperSlide>
         ))}
      </Swiper>
   );
};

function TopRated({ travels, isLoading }) {
   const [nextEl, setNextEl] = useState(null);
   const [prevEl, setPrevEl] = useState(null);
   const classNames = "hover:bg-dry transitions text-sm rounded w-8 h-8 flex-colo bg-subMain text-white";

   return (
      <div className="my-16">
         <Titles title="Top Rated" Icon={BsBookmarkStarFill} />
         <div className="mt-10">
            {isLoading ? <Loader /> : travels?.length > 0 ? <SwiperTop nextEl={nextEl} prevEl={prevEl} travels={travels} /> : <Empty message="Travel not found" />}
            <div className="w-full px-1 flex-rows gap-6 pt-12">
               <button className={classNames} ref={(node) => setPrevEl(node)}>
                  <BsCaretLeftFill />
               </button>
               <button className={classNames} ref={(node) => setNextEl(node)}>
                  <BsCaretRightFill />
               </button>
            </div>
         </div>
      </div>
   );
}

export default TopRated;
