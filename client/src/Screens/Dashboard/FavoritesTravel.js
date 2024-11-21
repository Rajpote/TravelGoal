import React, { useEffect } from "react";
import SideBar from "./SideBar";
import Table from "../../Components/Table";
import { useDispatch, useSelector } from "react-redux";
import { deleteFavoriteTravelsAction, getFavoriteTravelsAction } from "../../Redux/Actions/userActions";
import toast from "react-hot-toast";
import Loader from "../../Components/Notifications/Loader";
import { Empty } from "../../Components/Notifications/Empty";

function FavoritesTravel() {
   const dispatch = useDispatch();
   const { isLoading, isError, likedTravels } = useSelector((state) => state.userGetFavoriteTravel);
   const { isLoading: deleteLoading, isError: deleteError, isSuccess } = useSelector((state) => state.userDeleteFavoriteTravel);

   // delete travel handler
   const deleteTravelsHandler = () => {
      window.confirm("are you sure you want to delete all liked travel") && dispatch(deleteFavoriteTravelsAction());
   };
   useEffect(() => {
      dispatch(getFavoriteTravelsAction());
      if (isError || deleteError) {
         toast.error(isError || deleteError);
         dispatch({ type: isError ? "GET_FAVORITE_TRAVEL_RESET" : "DELETE_FAVORITE_TRAVEL_RESET" });
      }
   }, [dispatch, isError, deleteError, isSuccess]);
   return (
      <SideBar>
         <div className="flex flex-col gap-6">
            <div className="flex-btn gap-2">
               <h2 className="text-xl font-bold">Favorites Travel</h2>
               {likedTravels?.length > 0 && (
                  <button disabled={deleteLoading} onClick={deleteTravelsHandler} className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded">
                     {deleteLoading ? "Deleting..." : "Delete all"}
                  </button>
               )}
            </div>
            {isLoading ? <Loader /> : likedTravels.length > 0 ? <Table data={likedTravels} admin={false} /> : <Empty message="No Travel found" />}
         </div>
      </SideBar>
   );
}

export default FavoritesTravel;
