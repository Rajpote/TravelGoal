import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { useParams } from "react-router-dom";
import TravelInfo from "../Components/Single/TravelInfo";
import TravelRates from "../Components/Single/TravelRates";
import Titles from "../Components/Titles";
import { BsCollectionFill } from "react-icons/bs";
import Travel from "../Components/Travel";
import ShareModal from "../Screens/Dashboard/Admin/Modals/ShareModal";
import { HiSelector } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getTravelByIdAction } from "../Redux/Actions/TravelsAction";
import Loader from "../Components/Notifications/Loader";
import MapComponent from "../Components/MapComponent"; 

function SingleTravel() {
   const [modalOpen, setModalOpen] = useState(false);
   const { id } = useParams();
   const dispatch = useDispatch();
   const sameClass = "w-full gap-6 flex-colo xl:h-96 bg-dry lg:h-64 h-48";
   // use Selector
   const { isLoading, isError, travel } = useSelector((state) => state.getTravelByID);
   const { travels } = useSelector((state) => state.getAllTravels);
   const relatedTravel = travels?.filter((item) => item.category === travel?.category);

   // use Effect
   useEffect(() => {
      dispatch(getTravelByIdAction(id));
   }, [dispatch, id]);

   // Safeguard in case travel is undefined
   if (!travel) {
      return (
         <Layout>
            <ShareModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
            <div className="container mx-auto min-h-screen px-2 my-6">
               <h1 className="text-3xl font-bold text-center">Travel destination not found</h1>
            </div>
         </Layout>
      );
   }

   return (
      <Layout>
         {isLoading ? (
            <div className={sameClass}>
               <Loader />
            </div>
         ) : isError ? (
            <div className={sameClass}>
               <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
                  <HiSelector />
               </div>
               <p className="text-border text-sm">{isError}</p>
            </div>
         ) : (
            <>
               <ShareModal modalOpen={modalOpen} setModalOpen={setModalOpen} travel={travel} />
               <TravelInfo travel={travel} setModalOpen={setModalOpen} />
               <div className="container mx-auto min-h-screen px-2 my-6">
                  <TravelRates travel={travel} />
                  {/* Other Travel Info */}
                  {travel?.location?.coordinates?.length === 2 && (
                     <MapComponent
                        latitude={travel.location.coordinates[1]} // Pass latitude (index 1)
                        longitude={travel.location.coordinates[0]} // Pass longitude (index 0)
                        title={travel.name} // Pass travel name as title
                     />
                  )}

                  <div className="my-16">
                     <Titles title="Related Travel Destination" Icon={BsCollectionFill} />
                     {relatedTravel?.length > 0 && (
                        <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
                           {relatedTravel?.map((travel) => (
                              <Travel key={travel?._id} travel={travel} />
                           ))}
                        </div>
                     )}
                  </div>
               </div>
            </>
         )}
      </Layout>
   );
}

export default SingleTravel;
