import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTravelRecommendationsAction } from "../../Redux/Actions/TravelsAction.js";
import toast from "react-hot-toast";
import Travel from "../Travel.js";
import { Empty } from "../Notifications/Empty.js";
import Loader from "../Notifications/Loader.js";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Titles from "../Titles";
import { BsCollectionFill } from "react-icons/bs";

function TravelRecommendation() {
   const dispatch = useDispatch();
   const { isLoading, isError, recommendations } = useSelector((state) => state.travelRecommendation);
   const { userInfo } = useSelector((state) => state.userLogin);

   useEffect(() => {
      if (userInfo) {
         dispatch(getTravelRecommendationsAction(userInfo._id));
      }
   }, [dispatch, userInfo]);

   useEffect(() => {
      if (isError) {
         toast.error("Error fetching recommendations.");
         dispatch({ type: "TRAVEL_RECOMMENDATIONS_RESET" });
      }
   }, [isError, dispatch]);

   if (!userInfo) {
      return <div className="mt-10 text-center">Please log in to see your personalized recommendations.</div>;
   }

   return (
      <div className="mt-10 flex">
         {/* Side slider container */}
         <div className="w-full sticky top-0 p-4 overflow-hidden">
            <Titles title="Recommendation" Icon={BsCollectionFill} />
            {/* Swiper component */}
            {isLoading ? (
               <Loader />
            ) : recommendations && recommendations.length > 0 ? (
               <Swiper
                  direction="horizontal"
                  spaceBetween={10}
                  slidesPerView={4}
                  autoplay={{ delay: 3000 }}
                  modules={[Autoplay]}
                  className="h-full mt-8"
                  breakpoints={{
                     440: { slidesPerView: 1 }, // For small screens like phones
                     640: { slidesPerView: 1 }, // For small screens like phones
                     768: { slidesPerView: 2 }, // For medium screens like tablets
                     1024: { slidesPerView: 3 }, // For larger screens like laptops/desktops
                     1280: { slidesPerView: 4 }, // For extra-large screens
                  }}
               >
                  {recommendations.map((travel, index) => (
                     <SwiperSlide key={index}>
                        <Travel travel={travel} />
                     </SwiperSlide>
                  ))}
               </Swiper>
            ) : (
               <Empty message="No Recommendations" />
            )}
         </div>
      </div>
   );
}

export default TravelRecommendation;
