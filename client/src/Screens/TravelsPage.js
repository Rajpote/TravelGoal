import React, { useEffect, useMemo, useState } from "react";
import Layout from "../Layout/Layout";
import Filters from "../Components/Filters";
import Travel from "../Components/Travel";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";
import Loader from "../Components/Notifications/Loader";
import { Empty } from "../Components/Notifications/Empty";
import { getAllTravelsAction } from "../Redux/Actions/TravelsAction";
import { ratesData, timesData, yearsData } from "../Data/FilterData";
import { useParams } from "react-router-dom";

function TravelsPage() {
   const { search } = useParams();
   const dispatch = useDispatch();
   const [category, setCategory] = useState({ title: "All Categories" });
   const [year, setYear] = useState(yearsData[0]);
   const [time, setTimes] = useState(timesData[0]);
   const [rate, setRates] = useState(ratesData[0]);
   const sameClass = "text-white py-2 px-4 rounded font-semibold border-2 border-subMain hover:bg-subMain";

   // all movies
   const { isLoading, isError, travels, pages, page } = useSelector((state) => state.getAllTravels);

   // get all categories
   const { categories } = useSelector((state) => state.getAllCategories);

   // queries
   const queries = useMemo(() => {
      const query = {
         category: category?.title === "All Categories" ? "" : category?.title,
         time: time?.title.replace(/\D/g, ""),
         rate: rate?.title.replace(/\D/g, ""),
         year: year?.title.replace(/\D/g, ""),
         search: search ? search : "",
      };
      return query;
   }, [category, time, rate, year, search]);

   // useEffect
   useEffect(() => {
      if (isError) {
         toast.error(isError);
      }
      // get all travels
      dispatch(getAllTravelsAction(queries));
   }, [dispatch, isError, queries]);

   // pagination next and preview
   const nextPage = () => {
      dispatch(
         getAllTravelsAction({
            ...queries,
            pageNumber: page + 1,
         })
      );
   };
   const prevPage = () => {
      dispatch(
         getAllTravelsAction({
            ...queries,
            pageNumber: page - 1,
         })
      );
   };

   const datas = {
      categories: categories,
      category: category,
      setCategory: setCategory,
      year: year,
      setYear: setYear,
      time: time,
      setTimes: setTimes,
      rate: rate,
      setRates: setRates,
   };
   return (
      <Layout>
         <div className="min-height-screen container mx-auto px-2 mt-6">
            <Filters data={datas} />
            <p className="text-lg font-medium my-6">
               Total<span className="font-bold text-subMain"> {travels ? travels?.length : 0} </span> Destination Found {search && `for  "${search}"`}
            </p>
            {isLoading ? (
               <div className="w-full gap-6 flex-colo min-h-screen">
                  <Loader />
               </div>
            ) : travels?.length > 0 ? (
               <>
                  <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
                     {travels.map((travel, index) => (
                        <Travel key={index} travel={travel} />
                     ))}
                  </div>
                  <div className="w-full flex-rows md:my-20 my-10 gap-6">
                     <button disabled={page === 1} onClick={prevPage} className={sameClass}>
                        <TbPlayerTrackPrev className="text-xl" />
                     </button>
                     <button disabled={page === pages} onClick={nextPage} className={sameClass}>
                        <TbPlayerTrackNext className="text-xl" />
                     </button>
                  </div>
               </>
            ) : (
               <div className="w-full gap-6 flex-colo min-h-screen">
                  <div className="w-full h-24 p-5 rounded-full mb-4 bg-dry text-subMain text-4xl flex-colo">
                     <Empty />
                  </div>
                  <p className="text-border text-sm">dont have any travels</p>
               </div>
            )}
         </div>
      </Layout>
   );
}

export default TravelsPage;
