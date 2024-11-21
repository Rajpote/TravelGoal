import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { likeTravelAction } from "../Redux/Actions/userActions";

const IfTravelLiked = (travel) => {
   const { likedTravels } = useSelector((state) => state.userGetFavoriteTravel);
   return likedTravels?.find((likedtravel) => likedtravel?._id === travel?._id);
};

//like travel function
const LikeTravel = (travel, dispatch, userInfo) => {
   if (!userInfo) {
      toast.error("Please login to like a travel");
      return;
   }

   dispatch(
      likeTravelAction({
         travelId: travel._id,
      })
   );
};

export { IfTravelLiked, LikeTravel };
