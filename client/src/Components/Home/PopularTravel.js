import React from "react";
import Titles from "../Titles";
import { BsCollectionFill } from "react-icons/bs";
import Travel from "../Travel";
import Loader from "../Notifications/Loader";
import { Empty } from "../Notifications/Empty";

function PopularTravel({ isLoading, travels }) {
   return (
      <div className="my-16">
         <Titles title="Popular Places" Icon={BsCollectionFill} />
         {isLoading ? (
            <Loader />
         ) : travels?.length > 0 ? (
            <div className="grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
               {travels?.slice(0, 4).map((travel, index) => (
                  <Travel key={index} travel={travel} />
               ))}
            </div>
         ) : (
            <div className="mt-6">
               <Empty message="Travel not found" />
            </div>
         )}
      </div>
   );
}

export default PopularTravel;
