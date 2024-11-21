import React, { useEffect } from "react";
import SideBar from "../SideBar";
import Table from "../../../Components/Table";
import { useDispatch, useSelector } from "react-redux";
import { getAllTravelsAction, deleteAllTravelAction, deleteTravelAction } from "../../../Redux/Actions/TravelsAction";
import toast from "react-hot-toast";
import Loader from "../../../Components/Notifications/Loader";
import { Empty } from "../../../Components/Notifications/Empty";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";

function TravelList() {
   const dispatch = useDispatch();
   // all travel
   const { isLoading, isError, travels, pages, page } = useSelector((state) => state.getAllTravels);
   // delete travel
   const { isLoading: deleteLoading, isError: deleteError } = useSelector((state) => state.deleteTravel);
   // delete all travel
   const { isLoading: deleteAllLoading, isError: deleteAllError } = useSelector((state) => state.deleteAllTravels);
   const sameClass = "text-white p-2 rounded font-semibold border-2 border-subMain hover:bg-subMain";

   // delete travel handler
   const deleteTravelHandler = (id) => {
      window.confirm("are you sure you want to delete travel") && dispatch(deleteTravelAction(id));
   };

   // delete all travel handler
   const deleteAllTravelHandler = () => {
      window.confirm("are you sure you want to delete all travel") && dispatch(deleteAllTravelAction());
   };

   useEffect(() => {
      dispatch(getAllTravelsAction({}));
      if (isError || deleteError || deleteAllError) {
         toast.error(isError || deleteError || deleteAllError);
      }
   }, [dispatch, isError, deleteError, deleteAllError]);

   // pagination next and preview
   const nextPage = () => {
      dispatch(
         getAllTravelsAction({
            pageNumber: page + 1,
         })
      );
   };
   const prevPage = () => {
      dispatch(
         getAllTravelsAction({
            pageNumber: page - 1,
         })
      );
   };
   return (
      <SideBar>
         <div className="flex flex-col gap-6">
            <div className="flex-btn gap-2">
               <h2 className="text-xl font-bold">Travel Lists</h2>
               {travels?.length > 0 && (
                  <button disabled={deleteAllLoading} onClick={deleteAllTravelHandler} className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded">
                     {deleteAllLoading ? "deleting..." : "Delete All"}
                  </button>
               )}
            </div>
            {isLoading || deleteLoading ? (
               <Loader />
            ) : travels?.length > 0 ? (
               <>
                  <Table data={travels} admin={true} onDeleteHandler={deleteTravelHandler} />
                  <div className="w-full flex-rows my-5 gap-6">
                     <button disabled={page === 1} onClick={prevPage} className={sameClass}>
                        <TbPlayerTrackPrev className="text-xl" />
                     </button>
                     <button disabled={page === pages} onClick={nextPage} className={sameClass}>
                        <TbPlayerTrackNext className="text-xl" />
                     </button>
                  </div>
               </>
            ) : (
               <Empty message="No Travel found" />
            )}
         </div>
      </SideBar>
   );
}

export default TravelList;
